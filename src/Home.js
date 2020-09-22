import React from 'react'
import Product from './Product';
import "./Home.css";

function Home() {
    return (
        <React.Fragment>
            <div className="home_image">
            <img src="https://netrockdeals.sirv.com/WP_netrockdeals.com/2020/04/H/o/1/How-to-Get-Amazon-Prime-Membership-For-Free-banner-min-1.jpg"
            alt=""/>
            </div>
            <div className="home_row">
                <Product
                id="1"
                title="iPhone"
                price={11.7}
                rating={5}
                image="https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-11.jpg"
                />
                <Product
                id="2"
                title="Books"
                price={11.7}
                rating={5}
                image="https://images-na.ssl-images-amazon.com/images/I/81-QB7nDh4L.jpg"
                />
            </div>
            <div className="home_row">
                <Product
                id="3"
                title="Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric"
                price={11.7}
                rating={1}
                image="https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilex2$"
                />
                <Product
                id="4"
                title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor"
                price={11}
                rating={3}
                image="https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466_.jpg"
                />
                <Product
                id="5"
                title="New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)"
                price={11.7}
                rating={4}
                image="https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX385_.jpg"
                />
            </div>
            <div className="home_row">
                <Product
                id="6"
                title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor - Super Ultra Wide Dual WQHD 5120 x 1440"
                price={11.7}
                rating={5}
                image="https://images-na.ssl-images-amazon.com/images/I/81t2A6uhm4L._SL1500_.jpg"
                />
                
            </div>
        </React.Fragment>
    )
}

export default Home
