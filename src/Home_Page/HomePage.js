//Importing libraries
import React from "react";
import { Divider } from "@material-ui/core";

//Components
import TopSection from "./TopSection/TopSection";
import MiddleSection from "./MiddleSection/MiddleSection";
import Header from "./Header/header";
import ShowingTable from "./ShowingTable/ShowingTable";
import FinalSection from "./FinalSection/FinalSection";


//This is the homepage of the user
export default function HomePage({coins}) {
  
  return (
    <div>
      <Header /> {/* this is the header component*/}
      <TopSection />{/* this is the hero section*/}
      <MiddleSection />{/* this is where the cards of the home page is location*/}
      <Divider variant="middle" light className="divider-sml" /> {/* divides the page*/}
      <ShowingTable coins={coins} /> {/* Table to display the coins*/}
      <FinalSection /> {/* Where the user is at the bottom of the page and can then sign up*/}
    </div>
  );
}
