import { Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import RestaurantCard from "./restaurant-card";
import TabPanel from "./tab-panel";

export default function RestaurantDashboard() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  let tabStyle = "capitalize";

  return (
    <div>
      <p className="text-5xl mb-4 mt-2 text-center pt-2">
        <b>La Panera Rosa</b>
      </p>
      <div className="flex justify-center">
        <Tabs
          value={value}
          variant="scrollable"
          allowScrollButtonsMobile
          scrollButtons="auto"
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          aria-label="tabs"
        >
          <Tab
            className={tabStyle}
            label={"Lista"}
    
          />
          <Tab
            className={tabStyle}
            label={"Retiro de Pedidos"}
          />
        </Tabs>
      </div>
      <TabPanel value={value} index={0} other={""}>
        <RestaurantCard orderNumber="001" description="Tres Personas"/>
        <RestaurantCard orderNumber="002" description="Dos Personas"/>
        <RestaurantCard orderNumber="003" description="Cinco Personas"/>

      </TabPanel>
      <TabPanel value={value} index={1} other={""}>
      <RestaurantCard orderNumber="001" description="Pedido: milanesa con papas"/>
        <RestaurantCard orderNumber="002" description="Pedido: coca cola grande"/>
        <RestaurantCard orderNumber="003" description="Pedido: papas con cheddar"/>      
      </TabPanel>
    </div>
  );
}
