import http from "./http.service";
import {apiUrl} from "../config.json"

export function getGenres() {
    // return genres.filter(g => g);
    return http.get(apiUrl+"/genres");
  }
  