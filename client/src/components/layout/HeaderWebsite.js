import React from 'react'

export const HeaderWebsite = ({address,telephone,email}) => {
  return (
    <header className="header-website">
    <div className="container-fluid">
          <div className="row">
              <div className="col-md-3 d-flex justify-content-center align-items-center">
                  <div className="full">
                    <a className="logo" href="/">
                      Harike
                    </a>
                  </div>
              </div>
              <div className="col-md-9">
                  <div className="full">
                      <div className="right_header_info">
                          <ul>
                              <li className="dinone">Contact Us : <img style={{marginRight: "15px",marginLeft: "15px"}} src="/images-website/phone_icon.png" alt="#"/>
                              <a href="#">{telephone}</a>
                              </li>
                              <li className="dinone">
                                <img style={{marginRight: "15px"}} src="/images-website/mail_icon.png" alt="#"/>
                                <a href="#">{email}</a>
                              </li>
                              <li className="dinone">
                                <img style={{marginRight: "15px",height: "21px", position: "relative", top: "-2px"}} src="/images-website/location_icon.png" alt="#"/>
                                <a href="#">{address}</a>
                              </li>
                              <li className="button_user">
                                <a className="button active" href="/auth">Login</a>
                                <a className="button" href="#">Register</a>
                              </li>
                              <li>
                                <img style={{marginRight: "15px"}} src="/images-website/search_icon.png" alt="#"/>
                              </li>
                              <li>
                                  <button type="button" id="sidebarCollapse">
                                      <img src="/images-website/menu_icon.png" alt="#"/>
                                  </button>
                              </li>
                          </ul>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </header>
  )
}
