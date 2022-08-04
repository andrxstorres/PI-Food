import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHomeRecipes } from "../../redux/actions";
// import { Link } from "react-router-dom";
import HomeCard from "../HomeCard";
// import HomePaginationButtons from "../HomePaginationButtons";

export default function HomeCardsContainer({ allHomeRecipes }) {
  const dispatch = useDispatch();

  const cardsPerPage = 9;
  const [numberOfPages, setNumberOfPages] = useState(Math.floor(allHomeRecipes.length / cardsPerPage));
  const [currentPage, setCurrentPage] = useState(1);
  // const buttonLimitDetermination = () => {
  //   let difference = numberOfPages - currentPage;
  //   if (difference < 5) {
  //     return difference;
  //   }
  //   return 5;
  // };
  // const buttonLimit = buttonLimitDetermination();
  const buttonLimit = 7;

  useEffect(() => {
    setNumberOfPages(Math.floor(allHomeRecipes.length / cardsPerPage));
  }, [allHomeRecipes.length, currentPage, numberOfPages, allHomeRecipes]);

  //funciones de movimiento entre paginas
  function goToNext() {
    currentPage < numberOfPages && setCurrentPage((currentPage) => Number(currentPage) + 1);
  }
  function goToPrevious() {
    currentPage > 1 && setCurrentPage((currentPage) => Number(currentPage) - 1);
  }
  function onPageSelect(e) {
    e.target.value <= numberOfPages && setCurrentPage(e.target.value);
  }

  //determinación de la sección correspondiente de allHomeRecipes a renderizar mediante .slice()
  const getCurrentPageContent = () => {
    let startIndex = currentPage * cardsPerPage - cardsPerPage;
    let endIndex = startIndex + cardsPerPage;
    return allHomeRecipes.slice(startIndex, endIndex);
  };

  //determinación del array para renderizar los botones de paginas
  const getPaginationGroup = () => {
    const start = currentPage - 4;
    return new Array(buttonLimit).fill().map((_, i) => start + 1 + i);
  };
  // numberOfPages - currentPage < 5 ? numberOfPages - currentPage : 5

  //determina si se muestra el botón de reset home
  const alteredHome = useSelector((state) => state.alteredHome);

  const resetHome = () => {
    dispatch(getHomeRecipes());
  };
  // ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div>
      {
        numberOfPages > 0 ? (
          <div>
            <button type="button" value="1" onClick={onPageSelect}>
              First.
            </button>
            <button type="button" onClick={goToPrevious}>
              {"<"}
            </button>

            {getPaginationGroup()?.length > 0 &&
              getPaginationGroup().map((pageNumber) => {
                return (
                  <>
                    {pageNumber > numberOfPages || pageNumber < 1 ? null : (
                      <button type="button" key={pageNumber} value={pageNumber} onClick={onPageSelect}>
                        {pageNumber}
                      </button>
                    )}
                  </>
                );
              })}

            <button type="button" onClick={goToNext}>
              {">"}
            </button>
            <button type="button" value={numberOfPages} onClick={onPageSelect}>
              Last.
            </button>
            {/* <p> current page: {currentPage}</p>
          <p> number of pages: {numberOfPages}</p> */}
          </div>
        ) : null
        //        <div>
        //          <button disabled>{"<"}</button>
        //         <button>1</button>
        //         <button disabled>{">"}</button>
        //       </div>
      }

      {alteredHome && (
        <button type="button" onClick={resetHome}>
          Reload home.
        </button>
      )}

      <br />

      {getCurrentPageContent()?.length > 0 ? (
        getCurrentPageContent().map((recipe) => {
          return <HomeCard key={recipe.id} recipe={recipe} />;
        })
      ) : (
        <p>No recipes found. Search something else or reload the page.</p>
      )}
    </div>
  );
}
