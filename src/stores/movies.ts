import { ref, computed, type Ref } from "vue";
import { defineStore } from "pinia";
import {
  addToWish,
  createListsOfSimilarMovies,
  fetchFromApi,
  removeFromWish,
  parseMoviesCategories,
} from "@/utils/functions";

export const useMoviesStore = defineStore("movies", () => {
  // global state
  let datasContainer: Ref<{
    allMovies: Movie[] | null;
    allCategories: Genre[] | null;
    selectedCategories: Genre[] | null;
    popularMovies: Movie[] | null;
    similarMovies: null | { results: Movie[]; genre_id: Genre }[];
  }> = ref({
    allMovies: null,
    allCategories: null,
    selectedCategories: null,
    popularMovies: null,
    similarMovies: null,
    datasToDisplay: null,
  });

  // RECTIVES STATES
  let popularMoviesContainer: Ref<null | Movie[]> = ref(null);
  let selectedCategoriesContainer: Ref<null | Genre[]> = ref(null);
  let similarMoviesListContainer: Ref<
    null | { results: Movie[]; genre_id: Genre }[]
  > = ref(null);
  let choosenCategorie: Ref<null | string> = ref("Populaires");
  let movieList: Ref<Movie[] | null> = ref(null);
  let wishList: Ref<Movie_LocalStorage[]> = ref([]);
  let isLoading: Ref<boolean> = ref(false);
  let isNotif: Ref<{
    active: boolean;
    message: string | null;
    isError: boolean;
  }> = ref({
    active: false,
    message: null,
    isError: false,
  });

  // DISPLAY func
  // <========================>
  const displayDatasContainer = computed(() => datasContainer.value);
  const displayPopularMovies = computed(
    () => datasContainer.value?.popularMovies
  );
  const displaySelectedCategories = computed(
    () => selectedCategoriesContainer.value
  );
  const displaySimilarMoviesListContainer = computed(
    () => similarMoviesListContainer.value
  );
  const displayMovieList = computed(() => movieList.value);
  const displayChoosenCategorie = computed(() => choosenCategorie.value);
  const displayIsLoading = computed(() => isLoading.value);
  const displayWishList = computed(() => wishList.value);
  const displayIsNotif = computed(() => {
    isNotif.value;
  });
  // <========================>

  // POPULAR MOVIES MANAGEMENT
  // <========================>
  async function fetchAllPopularAndCategories() {
    const response = await fetchFromApi(
      // REQ W/ SECURE ENV VAR
      `https://api.themoviedb.org/3/movie/popular?api_key=${
        import.meta.env.VITE_TMDB_API_KEY
      }&language=fr-FR&page=1&adult=true`,
      isLoading
    ).then((response) => {
      const { results } = response;
      return results;
    });
    if (response && datasContainer.value) {
      datasContainer.value.allMovies = response;
    }
    await stockPopularMoviesWithLimit();
    await fetchAllCategories();
  }

  async function stockPopularMoviesWithLimit(limit = 4) {
    if (datasContainer.value.allMovies) {
      let container = [];
      for (let i = 0; i < limit; i++) {
        container.push(datasContainer.value?.allMovies[i]);
      }
      datasContainer.value.popularMovies = container;
    }
    popularMoviesContainer.value = datasContainer.value.popularMovies;
  }
  // <========================>

  // CATEGORIZE MOVIES
  // <========================>
  async function fetchAllCategories() {
    const { genres } = await fetchFromApi(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${
        import.meta.env.VITE_TMDB_API_KEY
      }&language=fr-FR`,
      isLoading
    );

    datasContainer.value.allCategories = genres;

    if (genres) {
      let container = await parseMoviesCategories(genres);

      datasContainer.value.selectedCategories = [...container];
    }
    selectedCategoriesContainer.value = datasContainer.value.selectedCategories;
  }

  async function getSimilarMoviesLists() {
    await fetchAllPopularAndCategories();

    if (
      datasContainer.value.allMovies &&
      datasContainer.value.selectedCategories
    ) {
      const result = await createListsOfSimilarMovies(
        datasContainer.value.allMovies,
        datasContainer.value.selectedCategories,
        isLoading
      );

      datasContainer.value.similarMovies = result;
      similarMoviesListContainer.value = datasContainer.value.similarMovies;
    }
  }

  // GET Targeted Movies genre
  async function getDatas(genre: string) {
    const find = displaySimilarMoviesListContainer.value?.find(
      (movie) => movie.genre_id.name === genre
    );
    if (find) {
      movieList.value = find?.results;
    }
  }

  // DISPLAY any MOVIES GENRE
  async function switchChoosenCategorie(genre: string) {
    if (genre === "Populaires") {
      choosenCategorie.value = "Populaires";
    } else if (genre === "Favoris") {
      choosenCategorie.value = "Favoris";
    } else {
      choosenCategorie.value = genre;
      await getDatas(choosenCategorie.value);
    }
  }

  // WISHLIST MANAGEMENT
  // <========================>
  function setupWishList() {
    // make sure storage exists
    if (!localStorage.getItem("movie-wishList")) {
      localStorage.setItem("movie-wishList", JSON.stringify(wishList.value));
      // "LOCAL-STORAGE HAD JUST BEEN INITIALIZED "
    }
    // "LOCAL-STORAGE IS MAINTAINED "

    wishList.value = JSON.parse(localStorage.getItem("movie-wishList") || "");
  }

  async function manageWishList(movie: Movie) {
    // Item will be registered
    let itemToStore: Movie_LocalStorage = {
      movie: movie.title,
      id: movie.id,
      image: movie.backdrop_path,
    };
    let list = wishList.value;

    // make sure storage exists
    if (!localStorage.getItem("movie-wishList")) {
      localStorage.setItem("movie-wishList", JSON.stringify(list));
    }

    // usable instance of localStorage
    let storage: Movie_LocalStorage[] = JSON.parse(
      localStorage.getItem("movie-wishList") || ""
    );

    // check movie into wishList
    const isItemRegistered = storage.findIndex(
      (item) => item.movie === itemToStore.movie && item.id === itemToStore.id
    );

    // ADD OR REMOVE FROM WISHLIST
    if (isItemRegistered === -1) {
      await addToWish(itemToStore, storage, list);
    } else {
      await removeFromWish(itemToStore, storage, list, isItemRegistered);
    }

    wishList.value = list;
  }

  // Notification MANAGER
  function toastNotifications(
    message: string,
    isError: boolean,
    duration: number
  ) {
    isNotif.value = { message, active: true, isError };

    setTimeout(() => {
      isNotif.value = { message: null, active: false, isError: false };
    }, duration);
  }

  return {
    displayDatasContainer,
    displayPopularMovies,
    displaySelectedCategories,
    displaySimilarMoviesListContainer,
    displayMovieList,
    displayChoosenCategorie,
    displayWishList,
    isLoading,
    isNotif,
    fetchAllPopularAndCategories,
    stockPopularMoviesWithLimit,
    fetchAllCategories,
    getSimilarMoviesLists,
    getDatas,
    switchChoosenCategorie,
    setupWishList,
    manageWishList,
    toastNotifications,
  };
});
