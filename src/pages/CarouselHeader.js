import { useEffect, useState } from "react";
import Apis, { endpoints } from "../configs/Apis";
import { Carousel } from "react-bootstrap";

const CarouselHeader = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const loadBanners = async () => {
        let res = await Apis.get(endpoints['banners_homepage']);
        setBanners(res.data)
    }
    loadBanners();
  }, [])
  return <Carousel data-bs-theme="dark" className="max-w-6xl shadow-2xl shadow-slate-600 ml-auto mr-auto mb-20 -mt-96">
        {banners.map(c => {
          return<Carousel.Item >
          <img
            className="d-block w-100"
            src={c.thumbnail}
          />
        </Carousel.Item>
        })}
      </Carousel>
}

export default CarouselHeader