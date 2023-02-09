const searchInput = document.getElementsByName("name")[0];
const submitInput = document.getElementsByClassName("searchBar")[0].getElementsByTagName("input")[1];

searchInput.addEventListener("input", (e) => {
    if (e.target.value.length != 0) {
        submitInput.disabled = false;
    } else {
        submitInput.disabled = true;
    }
});