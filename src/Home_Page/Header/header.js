//Importing libraries
import React from "react";
import { useNavigate } from "react-router";
//This is the navbar for the home page, where the user is able to access 
//forexample whether they can login or access online help 
export default function Header({isWhite}) {
  const navigate =useNavigate()
  const listStyle = { listStyle: "none", margin: "0 20px" }; //Declare an object for elements that have common styling

  const anchorStyle = {
    textTransform: "capitalize",
    textDecoration: "none",
    color: "white", 
  };  //Declare an object for elements that have common styling for the anchor
  return (
    <header //specifies the header tag to initiate adding URL link tags
      style={{  //css
        position: isWhite ? "" : "absolute",
        
        zIndex: 99,
        width: "100%",
        padding: "60px",
      }}
    >
      <div
        style={{ //css
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontWeight: 900, letterSpacing: "2px", color: isWhite ? "black" : "#fff", cursor: "pointer", fontSize: '1.5rem'  //css
        }} 
        onClick={()=>{navigate('/')}}
        >
          CRYSIM. {/*The name of my app*/}
        </div>
        <nav // the navbar for the home page
        > 
          <ul //specify the ul tag 
            style={{ //css
              margin: 0,
              padding: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
           
            <li style={listStyle}  //css
            >
              <a style={{...anchorStyle, color: isWhite ? "black" : "#fff", fontWeight: 'bold' }} //css
               href="/Help" //when click it directs to the following link
               >
                 Help {/* the name of the element */}
              </a>
            </li>
            <li
              style={{ //css
                color: "#fff",
                fontWeight: 600,
                background: "orange",
                padding: "16px 24px",
                borderRadius: "10px",
      
                ...listStyle, //Expand the object out for styling
                fontWeight: 'bold'
              }}
            >
              <a style={anchorStyle} href="/Login">
                Login {/* the label for the element */}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
