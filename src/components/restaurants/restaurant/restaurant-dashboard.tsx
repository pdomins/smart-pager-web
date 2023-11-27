import { Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import RestaurantCard from "./restaurant-card";
import TabPanel from "./tab-panel";
import qr from "@/app/images/qr.png";


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
            label={"Comensales en fila"}
    
          />
          <Tab
            className={tabStyle}
            label={"Retiro de pedidos"}
          />
          <Tab
            className={tabStyle}
            label={"Menú"}
          />
          <Tab
            className={tabStyle}
            label={"QR"}
          />
        </Tabs>
      </div>
      <TabPanel value={value} index={0} other={""}>
        <RestaurantCard orderNumber="Orden 001 - " description="Tres Personas"/>
        <RestaurantCard orderNumber="Orden 002 - " description="Dos Personas"/>
        <RestaurantCard orderNumber="Orden 003 - " description="Cinco Personas"/>

      </TabPanel>
      <TabPanel value={value} index={1} other={""}>
      <RestaurantCard orderNumber="Orden 001 - " description="Pedido: milanesa con papas"/>
        <RestaurantCard orderNumber="Orden 002 - " description="Pedido: coca cola grande"/>
        <RestaurantCard orderNumber="Orden 003 - " description="Pedido: papas con cheddar"/>      
      </TabPanel>
      <TabPanel value={value} index={2} other={""}>
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Subir el menú</h2>
        <form action="upload.php">
            <div className="mb-4">
                <label className="block text-gray-600 font-medium">Elige un archivo en formato pdf - esto es lo que verán tus clientes:</label>
                <input type="file" id="file" name="file" className="mt-1 p-2 w-full border border-gray-300 rounded"/>
            </div>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Subir archivo</button>
        </form>
      </div>
      </TabPanel>
      <TabPanel value={value} index={3} other={""}>
      <div className="flex items-center justify-center text-center mt-4">
          <img
              style={{ height: '250px', width: '250px' }}
              src={qr.src}
              alt="logo"
            />
      </div>
      </TabPanel>
    </div>
  );
}
