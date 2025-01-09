import { FC, useEffect, useState } from "react";
import "./PagesNavigation.css";
import { useAppDispatch } from "../../store";
import { stationsActions, useCurrentPage, useFoundCount } from "../../store/stations";
import { Button } from "react-bootstrap";

export const PagesNavigation: FC = () => {
    const dispatch = useAppDispatch();
    const currentPage = useCurrentPage();
    const foundCount = useFoundCount();
    const [lastPage,setLastPage] = useState(0);
      useEffect(()=>{
        setLastPage(Math.ceil(foundCount / 9))
        return;
      },[foundCount])
    return foundCount !==0 ? (
        <div className="pages-navigation">
            <Button disabled={(currentPage=="1")} onClick={() => dispatch(stationsActions.firstPage())}>&lt;&lt;</Button>
            <Button disabled={(currentPage=="1")} onClick={() => dispatch(stationsActions.prevPage())}>&lt;</Button>
            <h5>{(currentPage=="last")?lastPage:currentPage}|{lastPage}</h5>
            <Button disabled={(currentPage=="last" || parseInt(currentPage)==lastPage)} onClick={() => dispatch(stationsActions.nextPage())}>&gt;</Button>
            <Button disabled={(currentPage=="last" || parseInt(currentPage)==lastPage)} onClick={() => dispatch(stationsActions.lastPage())}>&gt;&gt;</Button>
        </div>
    ): null;
  };