import { NextApiRequest, NextApiResponse } from "next";
import { Tier, Web } from "../../../Details";
import campModel from "@/schemas/campaignInfo";
import NotifModel from "@/schemas/notifInfo";
import Connect from "@/schemas/connect";
import UserModel from "@/schemas/userInfo";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Content-Type", "application/javascript");

  if (req.headers.referer) {
    const targetAddr = req.headers.referer;
    const { uniqueid } = req.query;
    if (uniqueid && uniqueid.length === 42) {
      const str = uniqueid.toString();
      const first32 = str.substring(0, 32);
      const last10 = str.substring(str.length - 10);

      Connect();
      const plainAddr = targetAddr.split("/")[2];
      const campaignsList = await campModel
        .find({ URL: plainAddr, User: first32, selfID: last10 })
        .exec();

      if (campaignsList.length > 0) {
        //Check if user has limits
        const userData = await UserModel.find({ sysID: first32 });
        const userQuota = Tier.find(
          ({ Membership }) => Membership === userData[0].Membership
        );
        if (userData[0].MonthtlyImpressions > userQuota?.ALLOWED_IMPS!) {
          res.status(200).send(`console.log('Limit reached');`);
          return;
        } else {
          //resetting
          if (userData[0].MonthtlyImpressions !== 0) {
            const currentDate = new Date();
            const nextDay = new Date(
              currentDate.setDate(currentDate.getDate() + 1)
            );
            const isFirstDayOfMonth = nextDay.getDate() === 1;
            if (isFirstDayOfMonth) {
              const updatedUser = await UserModel.updateOne(
                { sysID: first32 },
                { MonthtlyImpressions: 0 }
              ).exec();
            }
          } else {
            const updatedUser = await UserModel.updateOne(
              { sysID: first32 },
              { $inc: { MonthtlyImpressions: 1 } }
            ).exec();
          }
        }

        const notifs = await NotifModel.find({
          CampaignID: campaignsList[0].selfID,
        }).exec();

        const updated = await NotifModel.updateMany(
          { CampaignID: campaignsList[0].selfID },
          { $inc: { Impression: 1 } },
          { new: true }
        ).exec();

        if (notifs.length > 0) {
          let devToolKit = "";
          let animation = "";
          let triggers = "";
          notifs.map((data) => {
            let currentBody = "";
            let targetID = "";
            if (data.NotifType === "Email Collector") {
              targetID = "emailCollectorBox";
              currentBody += `
                <div class='devToolsBox' id='${targetID}' style='background-color:${
                data.customizeBG
              };' >
                    <div class='dt_container_head' style='color: ${
                      data.customizeTitle
                    }'>
                        <b>${data.notifTitle}</b>
                        ${
                          data.displayCloseButton === true
                            ? "<span class='closingButton' onClick='Close(\"emailCollectorBox\");' title='Close'>x</span>"
                            : ""
                        }
                    </div>
                    <div class='dt_container_body'>
                        <p style='color: ${data.customizeDesc};'>${
                data.notifDesc
              }</p>
                        <div class='dt_inline_input'>
                            <input type="text" name="name" style='color: ${
                              data.customizeInputText
                            } !important; background-color: ${
                data.customizeInputBG
              } !important;' id="devtools_name" placeholder="${
                data.notifNPlaceholder
              }" />
                            <input type="email" name="email" style='color: ${
                              data.customizeInputText
                            } !important; background-color: ${
                data.customizeInputBG
              } !important;' id="devtools_email" placeholder="${
                data.notifEPlaceholder
              }" />
                        </div>
                        <button onClick='SubmitEmail(\"${
                          data.notifRedirect
                        }\");' class='dt_button' style='color: ${
                data.customizeButtonText
              }; background-color: ${data.customizeButtonBG};'>${
                data.notifButton
              }</button>
                        <div class='dt_copyright'>Powered by <a href='${
                          Web.Server
                        }' target='_blank' class='link'>DevTools</a></div>
                    </div>
                </div>`;
            }
            devToolKit += currentBody;

            let innerAnimationStarting = "";
            let innerAnimationEnd = "";

            if (data.displayPosition === "Top Left") {
              innerAnimationStarting = `
                        let initialValue = 110;
                        target.style['left'] = '15px';
                        target.style['top'] =  initialValue + 'px';
                    `;

              innerAnimationEnd = `
                        initialValue = initialValue + 15;
                        target.style['top'] =  initialValue + 'px';
                    `;
            } else if (data.displayPosition === "Bottom Right") {
              innerAnimationStarting = `
                        target.style['right'] = '15px';
                        target.style['bottom'] =  initialValue + 'px';
              `;

              innerAnimationEnd = `
                        initialValue = initialValue - 15;
                        const withStyle = initialValue + 'px';
                        target.style['bottom'] =  withStyle;
              `;
            }

            animation += `              
                function ${targetID}() {
                  let allowed = false;
                  if (window.innerWidth <= 768) {
                    allowed = ${data.triggerDisplaySmall};
                  } else if (window.innerWidth > 768) {
                    allowed = ${data.triggerDisplayLarge};
                  }

                  if (allowed) {
              
                    let opacity = 0;
                    let initialValue = 110;
                    const _int = setInterval(() => {
                        const target = document.getElementById('${targetID}');
                        ${innerAnimationStarting}
    
                        const tick = 0.2;
                        if (opacity < 1) {
                            opacity += tick;
                            target.style['opacity'] = opacity;
                            ${innerAnimationEnd}
                        } else {
                            clearInterval(_int);
                        }
                    }, 50); 
                  }
                }
            `;

            let writeTrigger = "";

            if (data.triggerType === "Delay") {
              const DeltaTime = parseInt(data.triggerValue) * 1000;
              writeTrigger += `
                setTimeout(() => {
                  ${targetID}();
                }, ${DeltaTime}); `;
            } else if (data.triggerType === "Exit Intent") {
              writeTrigger += `
                window.addEventListener('mouseout', (event) => {
                    if (event.clientY < 0 && !isExitIntent) {
                      ${targetID}();
                    }
                  }); `;
            } else if (data.triggerType === "Mouse Hover") {
              writeTrigger += `
                const elements = document.querySelectorAll("${data.triggerValue}");
                elements.forEach((element) => {
                    element.addEventListener("mouseenter", () => {
                      ${targetID}();
                    });
                }); `;
            } else if (data.triggerType === "Mouse Click") {
              writeTrigger += `
                const clickk = document.querySelectorAll("${data.triggerValue}");
                clickk.addEventListener("click", () => {
                  ${targetID}();
                }); `;
            } else if (data.triggerType === "Scroll Percentage") {
              writeTrigger += `
              const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
              if (scrollPercentage >= ${data.triggerValue}) {
                ${targetID}();
              } `;
            }

            triggers += writeTrigger;
          });

          const scriptStart =
            `window.addEventListener('load', function() {
            const bodyScript = document.createElement('script');
            bodyScript.setAttribute('id', 'devToolScripts');
            document.body.appendChild(bodyScript);

            const supportScript = document.createElement('script');
            supportScript.setAttribute('src', '${Web.Server}/cdn/support.js');
            document.body.appendChild(supportScript);
            
            const closingscript = "function Close(boxID) { document.getElementById(boxID).classList.add('hide'); }";
            bodyScript.textContent += closingscript;

            const customCss = document.createElement('link');
            customCss.rel = 'stylesheet';
            customCss.href='${Web.Server}/cdn/boxes.css';
            document.head.appendChild(customCss);
    
            const div = document.createElement('div');
            div.setAttribute('id', 'devToolKit');
            document.body.append(div);
            document.body.innerHTML += ` +
            "`" +
            devToolKit +
            "`" +
            `;

            ${animation}

            ${triggers}
            }); `;

          res.status(200).send(scriptStart);
        } else {
          res.status(200).send(`console.log('No notifications created yet')`);
        }
      } else res.status(200).send(`console.log('Hello world');`);
    } else res.status(200).send(`console.log('Not Allowed');`);
  } else res.status(200).send(`console.log('Not Allowed');`);
}
