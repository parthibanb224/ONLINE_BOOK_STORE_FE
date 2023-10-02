import React from "react";
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import OwnerDetails from "../components/OwnerDetails";
import Settings from "../components/Settings";

export default function MyAccount() {
    const [activeTab, setActiveTab] = React.useState("Add Details");
    const data = [
        {
            label: "Add Details",
            value: "Add Details",
            desc: <OwnerDetails />,
        },
        {
            label: "Settings",
            value: "Settings",
            desc: <Settings />,
        },
    ];
    return (
        <div className="mt-20">
            <Tabs value={activeTab}>
                <TabsHeader
                    className="rounded-lg border border-blue-gray-50 bg-transparent p-2 shadow-md text-slate-400"
                    indicatorProps={{
                        className:
                            "bg-transparent border-b-2 p-3 border-indigo-500 shadow-none rounded-none mt-2 text-slate-700",
                    }}
                >
                    {data.map(({ label, value }) => (
                        <Tab
                            key={value}
                            value={value}
                            onClick={() => setActiveTab(value)}
                            className={activeTab === value ? "text-gray-900" : ""}
                        >
                            {label}
                        </Tab>
                    ))}
                </TabsHeader>
                <TabsBody>
                    {data.map(({ value, desc }) => (
                        <TabPanel key={value} value={value}>
                            {desc}
                        </TabPanel>
                    ))}
                </TabsBody>
            </Tabs>
        </div>
    );
}