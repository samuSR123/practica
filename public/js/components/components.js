class Input extends HTMLElement {
    constructor() {
      super();
    };

    connectedCallback(){
      this.innerHTML = `<div class="relative w-full my-5">
      <input type="${this.getAttribute("type")}" id="${this.getAttribute("input_id")}" class="peer block border border-gray-200 rounded-md 
      bg-white w-full text-lg placeholder-gray-500 p-2 my-2 disabled:bg-gray-200 focus:ring-0 focus:outline-none" name="${this.getAttribute("input_name")}" 
      minlength="${this.getAttribute("maxlength")}" maxlength="${this.getAttribute("maxlength")}" required>
      <i id="${this.getAttribute("icon_id")}" class="opacity-0"></i>
      <label for="${this.getAttribute("for")}" id="${this.getAttribute("label_id")}" class="pointer-events-none rounded-md absolute 
      text-lg left-2 top-0.5 mb-0 max-w-[80%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-gray-500 transition-all 
      duration-200 ease-out peer-focus:-translate-y-[1rem] peer-focus:scale-[0.8] peer-focus:px-2 peer-focus:pt-0 
      peer-focus:text-primary peer-focus:bg-white peer-valid:-translate-y-[1rem] peer-valid:scale-[0.8] peer-valid:px-2 peer-valid:pt-0 
      peer-valid:text-primary peer-valid:bg-white motion-reduce:transition-none">${this.getAttribute("label_text")}</label>
      <div id="${this.getAttribute("span_id")}" class="text-base bg-red-600 text-gray-100 p-1 relative rounded bg-opacity-80 shadow-md text-center hidden">
      <span>${this.getAttribute("span_text")}</span></div>
      </div>`;
    }
  };
window.customElements.define('app-input', Input);

class Button extends HTMLElement {
    constructor() {
      super();
    };

    connectedCallback(){
      this.innerHTML = `<div><button type="submit" id="${this.getAttribute("id_")}" class="rounded-md bg-lime-600 w-full text-lg text-white font-semibold p-2 my-3 
      enabled:hover:bg-lime-700 peer disabled:opacity-50 disabled:cursor-not-allowed" disabled>Continuar</button>
      <div class="peer-enabled:hidden text-base bg-red-600 text-gray-100 p-2 relative rounded bg-opacity-50 shadow-xl text-center">
      <span>Completa todos los campos antes de continuar</span></div>
      </div>`;
    }
  };
window.customElements.define('app-button', Button);