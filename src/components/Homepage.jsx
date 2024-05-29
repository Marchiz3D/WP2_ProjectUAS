import React from "react"
import { Carousel, Image } from "react-bootstrap"

const Homepage = () => {
  return (
    <div className="container p-2">
      <section className="flex justify-center items-center mt-2">
        <Carousel className="lg:w-3/4 shadow-xl shadow-zinc-100">
          <Carousel.Item>
            <Image
              src="https://ecs7.tokopedia.net/blog-tokopedia-com/uploads/2020/11/10-Hotel-Terbaik-di-Bandung-dari-Segi-Fasilitas-Akses-dan-Pemandangan.jpg"
              className="w-100"
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Image
              src="https://ecs7.tokopedia.net/blog-tokopedia-com/uploads/2020/11/10-Hotel-Terbaik-di-Bandung-dari-Segi-Fasilitas-Akses-dan-Pemandangan.jpg"
              className="w-100"
            />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Image
              src="https://ecs7.tokopedia.net/blog-tokopedia-com/uploads/2020/11/10-Hotel-Terbaik-di-Bandung-dari-Segi-Fasilitas-Akses-dan-Pemandangan.jpg"
              className="w-100"
            />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </section>
      <section className="mt-5" id="about">
        <h1 className="text-center">About Us</h1>
        <div>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum, ut
            veniam optio non laudantium eos omnis! Quibusdam, ducimus ea
            laboriosam aut adipisci dolore porro incidunt dolor animi omnis
            necessitatibus ipsa ratione molestias eaque tempora dolorum ipsum
            non? Deleniti, cum et expedita magni, neque omnis necessitatibus
            labore dolor ex illum provident alias! Consequatur expedita culpa,
            beatae facilis, ipsam temporibus cupiditate quidem autem, qui
            veritatis architecto veniam? Asperiores nemo vitae rem nostrum
            pariatur quasi labore repudiandae corrupti perferendis, consequatur
            in molestias atque libero repellendus nesciunt aperiam, qui ipsum
            rerum voluptatibus veniam eos reiciendis assumenda? Tempore fuga
            odio, vitae dolor perspiciatis dolorum doloremque?
          </p>
        </div>
      </section>
    </div>
  )
}

export default Homepage
