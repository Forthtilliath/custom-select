import "./style.css";

// https://www.w3schools.com/howto/howto_custom_select.asp

const customSelects =
  document.querySelectorAll<HTMLDivElement>(".custom-select");

/* This is the main function that is creating the custom select box. It is looping through each custom
select box and creating the divs that will be used to create the custom select box. */
customSelects.forEach((customSelect) => {
  const keepDefault = customSelect.hasAttribute("keepdefault");

  const select = customSelect.querySelector("select");
  if (!select) throw new Error("Select not found");

  const options = Array.from(select.options);
  const divSelect = createDivElement(
    options[select.selectedIndex].innerHTML,
    "select-selected"
  );
  customSelect.appendChild(divSelect);

  const divOptions = createDivElement("", "select-items select-hide");
  options.forEach((option, i) => {
    if (!i && !keepDefault) return;

    const divOption = createDivElement(option.innerHTML);

    divOption.addEventListener("click", function () {
      const optionSelectedIndex = options.findIndex(
        (option) => option.innerHTML === this.innerHTML
      );
      select.selectedIndex = optionSelectedIndex;
      divSelect.innerHTML = options[optionSelectedIndex].innerHTML;
      divOptions.querySelector('.same-as-selected')?.classList.remove("same-as-selected")
      this.classList.add("same-as-selected");
    });

    divOptions.appendChild(divOption);
  });
  customSelect.appendChild(divOptions);

  divSelect.addEventListener("click", handlerClickSelect);
});

/**
 * Create a div element with the given html and className, and return it.
 * @param html - The HTML to be inserted into the div.
 * @param [className] - The class name of the div element.
 * @returns A div element with the class name and inner HTML set.
 */
function createDivElement(html = "", className = "") {
  const div = document.createElement("div");
  div.className = className;
  div.innerHTML = html;
  return div;
}

/**
 * When the user clicks on the select box, close all other select boxes, then open the one that was
 * clicked on.
 * @param e - the event object
 */
function handlerClickSelect(e: MouseEvent) {
  e.stopPropagation();
  const el = e.currentTarget as HTMLDivElement;
  closeAllSelect(el);
  el.nextElementSibling?.classList.toggle("select-hide");
  el.classList.toggle("select-arrow-active");
}

/**
 * If the clicked select is not the same as the selected select, remove the arrow-active class and add
 * the hide class.
 * @param  - The select element that was clicked.
 */
function closeAllSelect(selectClicked: HTMLDivElement | MouseEvent) {
  const selectSelecteds =
    document.querySelectorAll<HTMLDivElement>(".select-selected");

  selectSelecteds.forEach((selectSelected) => {
    if (selectSelected !== selectClicked) {
      selectSelected.classList.remove("select-arrow-active");
      selectSelected.nextElementSibling?.classList.add("select-hide");
    }
  });
}

/* If the user clicks anywhere outside the select box,
  then close all select boxes: */
document.addEventListener("click", closeAllSelect);
