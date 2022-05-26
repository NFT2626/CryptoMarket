import React from "react";
import { Divider } from "@material-ui/core";

//Components
import TopSection from "./TopSection/TopSection";
import MiddleSection from "./MiddleSection/MiddleSection";
import Header from "./Header/header";
import ShowingTable from "./ShowingTable/ShowingTable";
import FinalSection from "./FinalSection/FinalSection";


export default function HomePage({coins}) {
  
  return (
    <div>
      <Header />
      <TopSection />
      <MiddleSection />
      <Divider variant="middle" light className="divider-sml" />
      <ShowingTable coins={coins} />
      <FinalSection />
    </div>
  );
}
