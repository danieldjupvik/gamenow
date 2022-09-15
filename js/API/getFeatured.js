import { url as baseUrl } from "../settings/api.js";

export async function getFeatured() {
  const url = baseUrl + "/products";
  try {
    const response = await fetch(url);
    const json = await response.json();
    const filteredProducts = json.filter(function (ApiResult) {
      return ApiResult.featured;
    });
    filteredProducts.sort(function (a, b) {
      return a.featuredRanking - b.featuredRanking;
    });
    const result = filteredProducts;

    return {
      success: true,
      result: result,
    };
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
}
