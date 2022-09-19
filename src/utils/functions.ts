// import All requested categories to display in the app
// import type {
//   APIResponse,
//   APIResponse_Genre,
//   APIResponse_Popular,
//   Genre,
//   Movie,
// } from "@/types";
import type { Ref } from "vue";
import { categories } from "../utils/movie_categories.json";

export async function fetchFromApi(URL: string, isLoading: Ref<boolean>) {
  // RENVOYER ERREUR

  isLoading.value = true;

  const datas = await fetch(URL)
    .then((response) => response.json())
    .then((json) => {
      // console.log(json);
      return json;
    })
    .catch((e) => alert(e));

  isLoading.value = false;
  return datas;
}

// export function toastNotifications(error: Error) {
//   return alert(error);
// }

export async function createListsOfSimilarMovies(
  tableOfMovies: Movie[],
  tableOfCategories: Genre[],
  isLoading: Ref<boolean>
) {
  // let containerOrganizedByCategories: Ref<null | any[]> = ref(null);

  let listsOfSImilarMovies: { results: Movie[]; genre_id: Genre }[] = [];
  let containerOfLists: Movie[][] = [];

  for (const categorie of tableOfCategories) {
    let container: Movie[] = [];

    tableOfMovies.forEach(async (movie) => {
      for (let i = 0; i < movie.genre_ids.length; i++) {
        let found = false;
        if (movie.genre_ids[i] === categorie.id && !found) {
          container.push(movie);
          found = true;
        }
      }
    });
    containerOfLists.push(container);
  }

  containerOfLists.forEach(async (list, index) => {
    // console.log("LPOINTL", list.length);

    if (list.length > 0) {
      const randomNumber = Math.floor(Math.random() * list.length);
      // for (let movie of list) {
      // console.log("list", list);
      const RESULT = await makeCategorizedList(list[randomNumber], isLoading);
      // console.log("RESULT", RESULT);
      listsOfSImilarMovies.push({
        results: RESULT,
        genre_id: tableOfCategories[index],
      });
      // console.log("LOSM", listsOfSImilarMovies);
      // }
    } else {
      listsOfSImilarMovies.push({
        results: [],
        genre_id: tableOfCategories[index],
      });
    }
  });
  // console.log("LOSM", listsOfSImilarMovies);
  return listsOfSImilarMovies;

  // console.log("ContOfLi", containerOfLists);
}

// Create a list of filtered similar movies
async function makeCategorizedList(movie: Movie, isLoading: Ref<boolean>) {
  const list = await fetchFromApi(
    `https://api.themoviedb.org/3/movie/${movie.id}/similar?api_key=${
      import.meta.env.VITE_TMDB_API_KEY
    }&language=fr-FR&page=1`,
    isLoading
  );
  const { results } = list;
  return results;
}

export function parseMoviesCategories(
  tabOfCategoriesFromAPI: Genre[],
  callback?: Function
) {
  let tabOfCategorizedItems = [];

  for (let i = 0; i < categories.length; i++) {
    // console.log("KTGR", categories);
    // console.log(categories[i]);
    for (const TargetCategorie of tabOfCategoriesFromAPI) {
      if (categories[i] === TargetCategorie.name) {
        tabOfCategorizedItems.push(TargetCategorie);
      }
    }
  }

  return tabOfCategorizedItems;
}

// ADD
export function addToWish(
  itemToStore: Movie_LocalStorage,
  storage: Movie_LocalStorage[],
  list: Movie_LocalStorage[]
) {
  storage.push(itemToStore);

  // register new value into LS
  localStorage.setItem("movie-wishList", JSON.stringify(storage));

  // add movie into wishList local state
  list.push(itemToStore);
}

export function removeFromWish(
  movieToRemove: Movie_LocalStorage,
  storage: Movie_LocalStorage[],
  list: Movie_LocalStorage[],
  isItemRegistered: number
) {
  storage.splice(isItemRegistered, 1);
  localStorage.setItem("movie-wishList", JSON.stringify(storage));

  // remove movie from wishList local state
  const itemToRemove = list.findIndex((item) => item === movieToRemove);
  list.splice(itemToRemove, 1);
}
