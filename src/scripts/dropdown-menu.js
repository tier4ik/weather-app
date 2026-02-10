import { cityData } from "./loadData";

export default class dropdownMenu {
    constructor() {
        this.menu = document.querySelector('.units');
        this.menuBtn = this.menu.querySelector('.units__btn');
        this.menuContainer = this.menu.querySelector('.units__menu-container');
        this.radioLabels = this.menuContainer.querySelectorAll('label');
        this.radioInputs = this.menuContainer.querySelectorAll('input[type="radio"]');
        this.addListeners();
        // 
        this.menuOpen = this.menuContainer.classList.contains('units_open');
    }

    addListeners() {
        document.addEventListener('click', this.toggleMenuVisibility.bind(this));
        window.addEventListener('keyup', this.closeMenuFromKbd.bind(this));
        this.radioLabels.forEach(label => label.addEventListener('keyup', this.radioCheckWithKbd));
        this.radioInputs.forEach(input => input.addEventListener('change', this.changeUnits));
    }
    changeUnits(e) {
        if (e.target.name === 'metric') {
            const temperature = e.target.value === 'celsius' ? cityData.temperature : cityData.temperature * 1.8 + 36;
            document.getElementById('temperature').innerHTML = `${temperature}&deg;${e.target.value === 'celsius' ? 'C' : 'F'}`;
                
        } else if (e.target.name === 'speed') {
            const wind = e.target.value === 'km' ? cityData['wind-speed'] : Math.round(cityData['wind-speed'] / 1.609);
            document.getElementById('wind').innerHTML = `${wind} ${e.target.value === 'km' ? 'km/h' : 'm/h'}`
        } else {
            const precipatation = e.target.value === 'mm' ? cityData.precipatation : Math.round(cityData.precipatation / 25.4);
            document.getElementById('precipatation').innerHTML = `${precipatation} ${e.target.value === 'mm' ? 'mm' : 'in'}`;
        }
    }
    radioCheckWithKbd(e) {
        if (e.key === 'Enter') {
            e.preventDefault();     
            const currentInput = e.target.querySelector('input');
            if (!currentInput.checked) {
                currentInput.checked = true;
                const event = new Event('change');
                currentInput.dispatchEvent(event);
            }
        }
    }
    toggleMenuVisibility(evt) {
        if (evt.target.closest('.units__btn')) {
            if (this.menuOpen) {
                this.closeMenu()
            } else {
                this.openMenu()
            }
        } else {
            if (!this.menuOpen || evt.target.closest('.units__menu-container')) {
                return
            } else {
                this.closeMenu()
            }
        }
    }
    closeMenuFromKbd(e) {
        if (this.menuOpen && e.key === 'Escape') {
            this.closeMenu()
        }
    }
    closeMenu() {
        this.menuOpen = false;
        this.menu.classList.remove('units_open');
    }
    openMenu() {
        this.menuOpen = true;
        this.menu.classList.add('units_open');
    }
}