import Glide from "@glidejs/glide"

function heroSlider () {
 
    if (document.querySelector(".hero-slider")) {
      // count how many slides there are
      const dotCount = document.querySelectorAll(".hero-slider__slide").length

      // Generate the HTML for the navigation dots
      let dotHTML = ""
      for (let i = 0; i < dotCount; i++) {
        dotHTML += `<button class="slider__bullet glide__bullet" data-glide-dir="=${i}"></button>`
      }

      // Add the dots HTML to the DOM
      document.querySelector(".glide__bullets").insertAdjacentHTML("beforeend", dotHTML)

      // Actually initialize the glide / slider script
      // carousel type , 1 view of image, 4.5 sec delay and no gap between slides.
      var glide = new Glide(".hero-slider", {
        type: "carousel",
        perView: 1,
        autoplay: 4500,
        gap: 0
      })

      glide.mount()
    }
  
}

export default heroSlider


