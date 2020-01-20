import React, { Component } from 'react';

import Swiper from 'react-id-swiper';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: [],
      contentRepo: []
    };
  }

  connection(api) {
    fetch(api)
      .then(response => response.json())
      .then((data) => {
        this.setState({ content: data });

      }).catch((error) => {
        console.error(error, "Carregamento da Api falhou!")
      });
  }
  getContent() {
    const api = "http://localhost:3000/items/";

    this.connection(api);
  }
  componentDidMount() {
    this.getContent()
  }

  render() {
    const { content } = this.state;
    const params = {
      slidesPerView: 6,
      spaceBetween: 0,
      centeredSlides: false,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      breakpoints: {
        1440: {
          slidesPerView: 3,
          spaceBetween: 20
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 20
        },
        768: {
          slidesPerView: 2.3,
          spaceBetween: 50
        },
        320: {
          slidesPerView: 1,
          spaceBetween: 0
        }
      }
    }

    return (
      <div className="card">


        <Swiper {...params} shouldSwiperUpdate>
          {
            content.length > 0 ?
              content.map((item, key) => {
                return (

                  <div className="item" key={key}>
                    <img className="item__img" src={item.img} />
                    <span className="item__nome">{item.nome}, {item.sobreNome}</span>
                    <span className="item__funcao">{item.cargo}</span>

                  </div>

                )
              }) : null
          }
        </Swiper>
      </div>
    )
  }
}
export default Menu;
