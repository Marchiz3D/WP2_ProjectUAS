import React from "react"
import { Carousel, Image } from "react-bootstrap"

const Homepage = () => {
  return (
    <div className="container p-2">
      <section className="flex justify-center items-center mt-2">
        <Carousel className="lg:w-3/4 shadow-xl shadow-zinc-100">
          <Carousel.Item>
            <Image
              src="/assets/kolamrenang.jpg"
              className="w-100"
              style={{ height: "500px" }}
            />
            <Carousel.Caption className="bg-slate-800 rounded-md opacity-90">
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Image
              src="/assets/hotel.webp"
              className="w-100"
              style={{ height: "500px" }}
            />
            <Carousel.Caption className="bg-slate-800 rounded-md opacity-90">
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Image
              src="/assets/HotelHero.jpg"
              className="w-100"
              style={{ height: "500px" }}
            />
            <Carousel.Caption className="bg-slate-800 rounded-md opacity-90">
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </section>
      <section className="mt-5" id="about">
        <h1 className="text-center">Hotel Pallete</h1>
        <h4 className="italic text-center">"Book Your Dream Stay with Us"</h4>
        <div>
          <p>
            "Hotel Pallete adalah platform reservasi online yang memudahkan
            pengguna untuk memesan kamar di hotel, resort, atau lodge
            favoritnya. Dengan antarmuka yang intuitif dan cepat, pengguna dapat
            dengan mudah mencari, membandingkan, dan memesan kamar yang sesuai
            dengan kebutuhan mereka. Hotel Pallete menawarkan fitur-fitur
            inovatif seperti real-time availability, deskripsi kamar yang
            detail, serta sistem pembayaran yang aman. Dengan menggunakan Hotel
            Pallete, pengguna dapat memesan kamar dengan harga terbaik,
            mendapatkan informasi yang akurat tentang fasilitas dan hiburan di
            hotel, serta mengelola reservasi mereka secara online. "Book Your
            Dream Stay with Us" - demikian tagline Hotel Pallete yang
            menunjukkan bahwa aplikasi ini hadir untuk membantu Anda mendapatkan
            pengalaman menginap yang sempurna."
          </p>
        </div>
      </section>
    </div>
  )
}

export default Homepage
