import React from "react";
import { Link } from "react-router-dom";
import { Box, Container, Flex } from "@chakra-ui/react";

export const HeaderWebsite = ({ address, telephone, email }) => {
  return (
    <Box py="4" backgroundColor="gray.300">
      <Container maxWidth="container.xl">
        <Flex justifyContent="space-between" alignItems="center">
          <Box className="">
            <Link className="logo" to="/">
              Harike
            </Link>
          </Box>
          <Box>
            <div className="full">
              <div className="right_header_info">
                <ul>
                  <li className="dinone">
                    Contact Us :{" "}
                    <img
                      style={{ marginRight: "15px", marginLeft: "15px" }}
                      src="/images-website/phone_icon.png"
                      alt="#"
                    />
                    <a href="#">{telephone}</a>
                  </li>
                  <li className="dinone">
                    <img
                      style={{ marginRight: "15px" }}
                      src="/images-website/mail_icon.png"
                      alt="#"
                    />
                    <a href="#">{email}</a>
                  </li>
                  <li className="dinone">
                    <img
                      style={{
                        marginRight: "15px",
                        height: "21px",
                        position: "relative",
                        top: "-2px",
                      }}
                      src="/images-website/location_icon.png"
                      alt="#"
                    />
                    <a href="#">{address}</a>
                  </li>
                  <li className="button_user">
                    <a className="button active" href="/auth">
                      Login
                    </a>
                    <a className="button" href="#">
                      Register
                    </a>
                  </li>
                  <li>
                    <img
                      style={{ marginRight: "15px" }}
                      src="/images-website/search_icon.png"
                      alt="#"
                    />
                  </li>
                  <li>
                    <button type="button" id="sidebarCollapse">
                      <img src="/images-website/menu_icon.png" alt="#" />
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};
