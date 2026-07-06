// Rice & Fire — small helper script for GTM/GA4 practice
// dataLayer pushes here are OPTIONAL extras. Most tracking (clicks, scroll,
// pageviews) should be built inside Google Tag Manager itself with triggers.

window.dataLayer = window.dataLayer || [];

// ---- Contact / newsletter form ----
// GitHub Pages cannot process forms on a server, so we:
// 1. push a "generate_lead" event into the dataLayer (trackable in GTM)
// 2. redirect to the thank-you page (trackable as a destination pageview)
function handleFormSubmit(event) {
  event.preventDefault();
  var form = event.target;
  var cuisine = form.querySelector('#fav-cuisine');
  window.dataLayer.push({
    event: 'generate_lead',
    form_name: 'contact_form',
    favorite_cuisine: cuisine ? cuisine.value : undefined
  });
  // small delay so the event is captured before the page unloads
  setTimeout(function () { window.location.href = 'thank-you.html'; }, 300);
}

// ---- Save recipe button (fires a custom dataLayer event + shows a toast) ----
function saveRecipe(recipeName, cuisine) {
  window.dataLayer.push({
    event: 'save_recipe',
    recipe_name: recipeName,
    recipe_cuisine: cuisine
  });
  showToast('Recipe saved \u2764');
}

// ---- Print recipe button ----
function printRecipe(recipeName, cuisine) {
  window.dataLayer.push({
    event: 'print_recipe',
    recipe_name: recipeName,
    recipe_cuisine: cuisine
  });
  window.print();
}

function showToast(message) {
  var toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(function () { toast.classList.remove('show'); }, 2200);
}

// ---- Recipe filter buttons (recipes.html) ----
function filterRecipes(cuisine, btn) {
  document.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
  if (btn) btn.classList.add('active');
  document.querySelectorAll('[data-cuisine]').forEach(function (card) {
    var match = cuisine === 'all' || card.getAttribute('data-cuisine') === cuisine;
    card.style.display = match ? '' : 'none';
  });
  window.dataLayer.push({ event: 'filter_recipes', filter_cuisine: cuisine });
}
