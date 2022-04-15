import React from "react";
import Tab from "@material-tailwind/react/Tab";
import TabList from "@material-tailwind/react/TabList";
import TabItem from "@material-tailwind/react/TabItem";
import TabContent from "@material-tailwind/react/TabContent";
import TabPane from "@material-tailwind/react/TabPane";
import { useState } from "react";
import { addAllowance } from "@components/common/walletpanel";
import { UseAccount } from "@components/web3/hooks";


export default function Tabs () {
    const [openTab, setOpenTab] = useState(1);
    const { account } = UseAccount()
    return (
        <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center bg-transparent" >
           <Tab className="p-5 sm:w-96 w-full flex flex-col justify-start items-center bg-transparent">
            <TabList color="">


                <TabItem
                    onClick={(e) => {
                        e.preventDefault();
                        setOpenTab(1);
                    }}
                    ripple="light"
                    active={openTab === 1 ? true : false}
                    href="tabItem"
                >
                    Withdraw
                </TabItem>
                <TabItem 
                    onClick={(e) => {
                        e.preventDefault();
                        setOpenTab(2);
                    }}
                    ripple="light"
                    active={openTab === 2 ? true : false}
                    href="tabItem"
                >
                    Add Allowance
                </TabItem>
                <TabItem
                    onClick={(e) => {
                        e.preventDefault();
                        setOpenTab(3);
                    }}
                    ripple="light"
                    active={openTab === 3 ? true : false}
                    href="tabItem"
                >
                    Reduce Allowance
                </TabItem>
                


            </TabList>
                <TabContent>
                    <TabPane
                    ripple="light"
                    active={openTab === 1 ? true : false}
                    >
                        {addAllowance()}
                    </TabPane>
                    <TabPane 
                    active={openTab === 2 ? true : false}>
                        {addAllowance()}
                    </TabPane>
                    <TabPane active={openTab === 3 ? true : false}>
                        {addAllowance()}
                    </TabPane>
                </TabContent>
            </Tab>
        </div>
    );
}