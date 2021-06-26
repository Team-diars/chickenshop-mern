import React from 'react'
import {HeaderWebsite} from '../components/layout/HeaderWebsite'

const HomeScreen = () => {
  return (
    <div id="content">
      <HeaderWebsite/>
      <div className="slider_section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="full">
                <div id="main_slider" className="carousel vert slide" data-ride="carousel" data-interval="5000">
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <div className="row">
                        <div className="col-md-5">
                          <div className="slider_cont">
                            <h3>Discover Restaurants<br/>That deliver near You</h3>
                            <p>It is a long established fact that a reader will be distracted by the readable content of
                              a page when looking at its layout.</p>
                            <a className="main_bt_border" href="#">Order Now</a>
                          </div>
                        </div>
                        <div className="col-md-7">
                          <div className="slider_image full text_align_center">
                            <img className="img-responsive" src="/images-website/burger_slide.png" alt="#" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="carousel-item">
                      <div className="row">
                        <div className="col-md-5">
                          <div className="slider_cont">
                            <h3>Discover Restaurants<br/>That deliver near You</h3>
                            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                            <a className="main_bt_border" href="#">Order Now</a>
                          </div>
                        </div>
                        <div className="col-md-7 full text_align_center">
                          <div className="slider_image">
                            <img className="img-responsive" src="/images-website/burger_slide.png" alt="#" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <a className="carousel-control-prev" href="#main_slider" role="button" data-slide="prev">
                    <i className="fa fa-angle-up"></i>
                  </a>
                  <a className="carousel-control-next" href="#main_slider" role="button" data-slide="next">
                    <i className="fa fa-angle-down"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="resip_section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="ourheading">
                <h2>Our Recipes</h2>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="owl-carousel owl-theme">
                    <div className="item">
                      <div className="product_blog_img">
                        <img src="/images-website/rs1.png" alt="#" />
                      </div>
                      <div className="product_blog_cont">
                        <h3>Homemade</h3>
                        <h4><span className="theme_color">$</span>10</h4>
                      </div>
                    </div>
                    <div className="item">
                      <div className="product_blog_img">
                        <img src="/images-website/rs2.png" alt="#" />
                      </div>
                      <div className="product_blog_cont">
                        <h3>Noodles</h3>
                        <h4><span className="theme_color">$</span>20</h4>
                      </div>
                    </div>
                    <div className="item">
                      <div className="product_blog_img">
                        <img src="/images-website/rs3.png" alt="#" />
                      </div>
                      <div className="product_blog_cont">
                        <h3>Egg</h3>
                        <h4><span className="theme_color">$</span>30</h4>
                      </div>
                    </div>
                    <div className="item">
                      <div className="product_blog_img">
                        <img src="/images-website/rs4.png" alt="#" />
                      </div>
                      <div className="product_blog_cont">
                        <h3>Sushi Dizzy</h3>
                        <h4><span className="theme_color">$</span>40</h4>
                      </div>
                    </div>
                    <div className="item">
                      <div className="product_blog_img">
                        <img src="/images-website/rs5.png" alt="#" />
                      </div>
                      <div className="product_blog_cont">
                        <h3>The Coffee break</h3>
                        <h4><span className="theme_color">$</span>50</h4>
                      </div>
                    </div>
                    <div className="item">
                      <div className="product_blog_img">
                        <img src="/images-website/rs1.png" alt="#" />
                      </div>
                      <div className="product_blog_cont">
                        <h3>Homemade</h3>
                        <h4><span className="theme_color">$</span>10</h4>
                      </div>
                    </div>
                    <div className="item">
                      <div className="product_blog_img">
                        <img src="/images-website/rs2.png" alt="#" />
                      </div>
                      <div className="product_blog_cont">
                        <h3>Noodles</h3>
                        <h4><span className="theme_color">$</span>20</h4>
                      </div>
                    </div>
                    <div className="item">
                      <div className="product_blog_img">
                        <img src="/images-website/rs3.png" alt="#" />
                      </div>
                      <div className="product_blog_cont">
                        <h3>Egg</h3>
                        <h4><span className="theme_color">$</span>30</h4>
                      </div>
                    </div>
                    <div className="item">
                      <div className="product_blog_img">
                        <img src="/images-website/rs4.png" alt="#" />
                      </div>
                      <div className="product_blog_cont">
                        <h3>Sushi Dizzy</h3>
                        <h4><span className="theme_color">$</span>40</h4>
                      </div>
                    </div>
                    <div className="item">
                      <div className="product_blog_img">
                        <img src="/images-website/rs5.png" alt="#" />
                      </div>
                      <div className="product_blog_cont">
                        <h3>The Coffee break</h3>
                        <h4><span className="theme_color">$</span>50</h4>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="bg_bg">

        <div className="about">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="title">
                  <i><img src="/images-website/title.png" alt="#" /></i>
                  <h2>About Our Food & Restaurant</h2>
                  <span>It is a long established fact that a reader will be distracted by the readable content of a <br/> page when looking at its layout. The point of using Lorem
                  </span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                <div className="about_box">
                  <h3>Best Food</h3>
                  <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of
                    classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin
                    professor at Hampden-Sydney College in Virginia, looked up one of the more obscureContrary to
                    popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin
                    literature from 45 BC, making it over 2000 years old. Richard </p>
                  <a href="#">Read More <i className="fa fa-long-arrow-right" aria-hidden="true"></i></a>
                </div>
              </div>
              <div className="col-xl-5 col-lg-5 col-md-10 col-sm-12 about_img_boxpdnt">
                <div className="about_img">
                  <figure><img src="/images-website/about-img.jpg" alt="#/"/></figure>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="blog">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="title">
                  <i><img src="/images-website/title.png" alt="#" /></i>
                  <h2>Our Blog</h2>
                  <span>when looking at its layout. The point of using Lorem</span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 mar_bottom">
                <div className="blog_box">
                  <div className="blog_img_box">
                    <figure><img src="/images-website/blog_img1.png" alt="#" />
                      <span>02 FEB 2019</span>
                    </figure>
                  </div>
                  <h3>Spicy Barger</h3>
                  <p>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                    Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                    their exact original form, accompanied by English versions from the </p>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 mar_bottom">
                <div className="blog_box">
                  <div className="blog_img_box">
                    <figure><img src="/images-website/blog_img2.png" alt="#" />
                      <span>02 FEB 2019</span>
                    </figure>
                  </div>
                  <h3>Egg & Tosh</h3>
                  <p>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                    Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                    their exact original form, accompanied by English versions from the </p>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                <div className="blog_box">
                  <div className="blog_img_box">
                    <figure><img src="/images-website/blog_img3.png" alt="#" />
                      <span>02 FEB 2019</span>
                    </figure>
                  </div>
                  <h3>Pizza</h3>
                  <p>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                    Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                    their exact original form, accompanied by English versions from the </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="Client">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="title">
                  <i><img src="/images-website/title.png" alt="#" /></i>
                  <h2>Our Client</h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 offset-md-3">
                <div className="Client_box">
                  <img src="/images-website/client.jpg" alt="#" />
                  <h3>Roock Due</h3>
                  <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered
                    alteration in some form, by injected humour, or randomised words which don’t look even slightly
                    believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn’t
                    anything embarrassing hidden in the middle of text.</p>
                  <i><img src="/images-website/client_icon.png" alt="#" /></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <div class="footer">
          <div class="container-fluid">
            <div class="row">
              <div class=" col-md-12">
                <h2>Request A<strong class="white"> Call Back</strong></h2>
              </div>
              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12">

                <form class="main_form">
                  <div class="row">

                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <input class="form-control" placeholder="Name" type="text" name="Name"/>
                    </div>
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <input class="form-control" placeholder="Email" type="text" name="Email"/>
                    </div>
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <input class="form-control" placeholder="Phone" type="text" name="Phone"/>
                    </div>
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <textarea class="textarea" placeholder="Message" type="text" name="Message"></textarea>
                    </div>
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <button class="send">Send</button>
                    </div>
                  </div>
                </form>
              </div>
              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                <div class="img-box">
                  <figure><img src="/images-website/img.jpg" alt="img" /></figure>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="footer_logo">
                  <a href="/">Harike</a>
                </div>
              </div>
              <div class="col-md-12">
                <ul class="lik">
                  <li class="active"> <a href="index.html">Home</a></li>
                  <li> <a href="about.html">About</a></li>
                  <li> <a href="recipe.html">Recipe</a></li>
                  <li> <a href="blog.html">Blog</a></li>
                  <li> <a href="contact.html">Contact us</a></li>
                </ul>
              </div>
              <div class="col-md-12">
                <div class="new">
                  <h3>Newsletter</h3>
                  <form class="newtetter">
                    <input class="tetter" placeholder="Your email" type="text" name="Your email"/>
                    <button class="submit">Subscribe</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div class="copyright">
            <div class="container">
              <p>© 2021 All Rights Reserved. Harike</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomeScreen