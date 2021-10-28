import React, { useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import EventTable from "./EventTable";
import HighCharts from "./HighChart";
import { Button } from "@mui/material";
import Link from "next/link";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {children}
    </div>
  );
}

export default function TabSection() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box className="mt-5" sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Event List" {...a11yProps(0)} />
          <Tab label="High Chart" {...a11yProps(1)} />
        </Tabs>
        <div className="row" style={{ marginTop: -40 }}>
          <div className="col mb-2 d-flex justify-content-end">
            <Link href="/create">
              <Button variant="contained">+ Add</Button>
            </Link>
          </div>
        </div>
      </Box>
      <TabPanel value={value} index={0}>
        <EventTable />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <HighCharts />
      </TabPanel>
    </Box>
  );
}
