// import React from "react";
// import Tab from "@material-tailwind/react/Tab";
// import TabList from "@material-tailwind/react/TabList";
// import TabItem from "@material-tailwind/react/TabItem";
// import TabContent from "@material-tailwind/react/TabContent";
// import TabPane from "@material-tailwind/react/TabPane";
// import { useState } from "react";
// import { addAllowance, withdraw } from "@components/common/walletpanel";
// import { UseAccount } from "@components/web3/hooks";


// export default function Tabs () {
//     const [openTab, setOpenTab] = useState(1);
//     const { account } = UseAccount()
//     return (
//         <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center bg-transparent" >
//            <Tab className="p-5 sm:w-96 w-full flex flex-col justify-start items-center bg-transparent">
//             <TabList className="flex items-center justify-center gap-1 rounded-lg text-sm font-medium py-4 px-6 leading-normal text-white transition-all duration-300 ">
            
//                 <TabItem
//                     onClick={(e) => {
//                         e.preventDefault();
//                         setOpenTab(1);
//                     }}
//                     ripple="light"
//                     active={openTab === 1 ? true : false}
//                     href="tabItem"
//                 >
//                     Withdraw
//                 </TabItem>

//                 <TabItem 
//                     onClick={(e) => {
//                         e.preventDefault();
//                         setOpenTab(2);
//                     }}
//                     ripple="light"
//                     active={openTab === 2 ? true : false}
//                     href="tabItem"
//                 >
//                     Add Allowance
//                 </TabItem>
                
//             </TabList>
//                 <TabContent>
//                     <TabPane
//                     ripple="light"
//                     active={openTab === 1 ? true : false}
//                     >
//                         {withdraw()}
//                     </TabPane>
//                     <TabPane 
//                     active={openTab === 2 ? true : false}>
//                         {addAllowance()}
//                     </TabPane>
//                 </TabContent>
//             </Tab>
//         </div>
//     );
// }



import React from "react";
import { useState } from "react";
import { addAllowance, withdraw } from "@components/common/walletpanel";

export default function Tabs ({ color }) {
  const [openTab, setOpenTab] = useState(1);

    return (
        <div className="flex flex-wrap">
          <div className="w-full">
            <ul
              className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
              role="tablist"
            >
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a className={
                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 1
                      ? "text-white bg-" + color + "-600" 
                      : "text-" + color + "-600 bg-transparent")
                    }
                      onClick={e => {
                        e.preventDefault();
                        setOpenTab(1);
                      }}
                      data-toggle="tab"
                      href="#link1"
                      role="tablist"
                  >
                  <i className="text-base mr-1"></i> Withdraw
                </a>
              </li>
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a className={
                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 2
                      ? "text-white bg-" + color + "-600"
                      : "text-" + color + "-600 bg-transparent")
                    }
                      onClick={e => {
                        e.preventDefault();
                        setOpenTab(2);
                      }}
                      data-toggle="tab"
                      href="#link2"
                      role="tablist"
                  >
                  <i className="text-base mr-1"></i>  Add Allowance
                </a>
              </li>
              {/* <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 3
                      ? "text-white bg-" + color + "-600"
                      : "text-" + color + "-600 bg-white")
                  }
                  onClick={e => {
                    e.preventDefault();
                    setOpenTab(3);
                  }}
                  data-toggle="tab"
                  href="#link3"
                  role="tablist"
                >
                  <i className="fas fa-briefcase text-base mr-1"></i>  Options
                </a>
              </li> */}
            </ul>
          </div>
        </div>
    )


}


