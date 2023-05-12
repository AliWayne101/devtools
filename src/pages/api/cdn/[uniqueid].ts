import { NextApiRequest, NextApiResponse } from "next";
import { Web } from "../../../Details";
import campModel from "@/schemas/campaignInfo";
import NotifModel from "@/schemas/notifInfo";
import Connect from "@/schemas/connect";
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
      const plainAddr = targetAddr.split('/')[2];
      const campaignsList = await campModel
        .find({ URL: plainAddr, User: first32, selfID: last10 })
        .exec();
      console.log(campaignsList);
      if (campaignsList.length > 0) {
        const notifs = await NotifModel.find({
          CampaignID: campaignsList[0].selfID,
        }).exec();
        if (notifs.length > 0) {
          let devToolKit = "";
          let animation = "";
          let triggers = "";
          notifs.map((data) => {
            let currentBody = "";
            if (data.NotifType === "Email Collector") {
              currentBody += `
                <div class='emailCollectorBox' id='emailCollectorBox' style='background-color:${data.customizeBG};' >
                    <div class='dt_container_head' style='color: ${data.customizeTitle}'>
                        <b>${data.notifTitle}</b>
                        ${data.displayCloseButton === true ? "<span class='closingButton' onClick='Close(\"emailCollectorBox\");' title='Close'>x</span>" : ""}
                    </div>
                    <div class='dt_container_body'>
                        <p style='color: ${data.customizeDesc};'>${data.notifDesc}</p>
                        <div class='dt_inline_input'>
                            <input type="text" name="name" style='color: ${data.customizeButtonText} !important; background-color: ${data.customizeInputBG} !important;' id="devtools_name" placeholder="${data.notifNPlaceholder}" />
                            <input type="email" name="email" style='color: ${data.customizeButtonText} !important; background-color: ${data.customizeInputBG} !important;' id="devtools_email" placeholder="${data.notifEPlaceholder}" />
                        </div>
                        <button onClick='SubmitEmail();' class='dt_button' style='color: ${data.customizeButtonText}; background-color: ${data.customizeButtonBG};'>${data.notifButton}</button>
                        <div class='dt_copyright'>Powered by <a href='${Web.Server}' target='_blank' class='link'>DevTools</a></div>
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
              console.log(initialValue);
              `;
            }

            animation += `
            function startShowing() {
                let opacity = 0;
                let initialValue = 110;
                const _int = setInterval(() => {
                    const target = document.getElementById('emailCollectorBox');
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
                `;

            let writeTrigger = "";

            if (data.triggerType === "Delay") {
              const DeltaTime = parseInt(data.triggerValue) * 1000;
              writeTrigger += `
                      setTimeout(() => {
                        console.log('Showing now');
                        startShowing();
                      }, ${DeltaTime}); `;
            } else if (data.triggerType === "Exit Intent") {
              writeTrigger += `
                      window.addEventListener('mouseout', (event) => {
                          if (event.clientY < 0 && !isExitIntent) {
                            startShowing();
                          }
                        }); `;
            } else if (data.triggerType === "Mouse Hover") {
              writeTrigger += `
                  const elements = document.querySelectorAll("${data.triggerValue}");
                  elements.forEach((element) => {
                      element.addEventListener("mouseenter", () => {
                        startShowing();
                      });
                  }); `;
            } else if (data.triggerType === "Mouse Click") {
              writeTrigger += `
                      const clickk = document.querySelectorAll("${data.triggerValue}");
                      clickk.addEventListener("click", () => {
                        startShowing();
                      }); `;
            } else if (data.triggerType === "Scroll Percentage") {
              writeTrigger += `const scrollPercentage =
                  (window.scrollY /
                    (document.documentElement.scrollHeight -
                      window.innerHeight)) *
                  100;
                  
                  if (scrollPercentage >= ${data.triggerValue}) {
                    startShowing();
                  } `;
            }

            triggers += `
              let allowed = false;
              if (window.innerWidth <= 768) {
                allowed = ${data.triggerDisplaySmall};
              } else if (window.innerWidth > 768) {
                allowed = ${data.triggerDisplayLarge};
              }
              
              if (allowed) {
                ${writeTrigger}
              }
              `;
          });

          const scriptStart = `window.addEventListener('load', function() {
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
            document.body.innerHTML += ` + '`' + devToolKit + '`' + `;

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
