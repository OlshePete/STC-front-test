import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  changeSortDirection,
  setLoadingFalse,
  setPage,
} from "../../store/mainSlice";
import {
  selectFilteredAndSortedData,
  selectHasResult,
  selectPageStatus,
} from "../../store/selectors";

import styles from "./TableView.module.css";

import headIcon from "../../assets/icons/table-head-image.svg";
import blankImage from "../../assets/image/blank-image.png";
import { phoneFormat } from "../../utils/formUtils";

function TableView({ setActive }) {
  const dispatch = useDispatch();
  const tbodyRef = useRef(null);
  const list = useSelector(selectFilteredAndSortedData);
  const page_status = useSelector(selectPageStatus);
  const has_result = useSelector(selectHasResult);
  const mode = useSelector((state) => state.phoneBook.mode);
  const is_sort_desc = useSelector((state) => state.phoneBook.is_sort_desc);

  const [inView, setInView] = useState([...list]);
  useEffect(() => {
    has_result && tbodyRef?.current?.children[0]?.scrollIntoView();
  }, [is_sort_desc, has_result]);

  useEffect(() => {
    if (page_status.loading)
      new Promise((resolve) => setTimeout(resolve(),300))
        .then(
          setInView((prev) =>
            page_status.page > 0 ? [...prev, ...list] : [...list]
          )
        )
        .then(dispatch(setLoadingFalse()));
  }, [list, page_status.page, page_status.loading, dispatch]);

  const handleScroll = (event) => {
    if (page_status.loading) return;
    if (!page_status.has_next) return;
    const target = event.currentTarget;
    const bottomOffset = 50;
    if (
      target.scrollHeight - bottomOffset <=
      target.scrollTop + target.clientHeight
    ) {
      dispatch(setPage(page_status.page + 1));
    }
  };
  const handleSortDirection = () => dispatch(changeSortDirection());
  return (
    <main className={styles.tableContainer} onScroll={handleScroll}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th
              className={styles.avatarColumn}
              onClick={() =>
                page_status.has_next
                  ? dispatch(setPage(page_status.page + 1))
                  : alert()
              }
            >
              <img src={headIcon} alt="headIcon" />
            </th>
            <th
              className={`${styles.fullName} ${
                is_sort_desc ? styles.opposite : ""
              }`}
              onClick={handleSortDirection}
            >
              <p>
                Имя <span>{"▲"}</span>
              </p>
            </th>
            <th className={styles.phone}>Телефон</th>
            <th className={styles.address}>Адрес</th>
            <th className={styles.mail}>Почта</th>
            <th></th>
          </tr>
        </thead>
        <tbody ref={tbodyRef}>
          {!page_status.loading &&
            inView &&
            Array.isArray(inView) &&
            inView.map((note, index) => {
              const {
                first_name,
                last_name,
                phoneNumber,
                address,
                mail,
                patronymic,
                image,
              } = note;
              const fullName = [first_name, last_name, patronymic]
                .join(" ")
                .trim();
              const formattedNumber = Array.isArray(phoneNumber)?phoneFormat(phoneNumber[0]):phoneNumber ? phoneFormat(phoneNumber): "";
              return (
                <tr key={index} onClick={() => setActive(note)}>
                  <th className={styles.avatarColumn}>
                      <img alt="avatar" src={image ?? blankImage} />
                  </th>
                  <th className={styles.fullName}>{fullName}</th>
                  <th className={styles.phone}>{formattedNumber}</th>
                  <th className={styles.address}>{address}</th>
                  <th className={styles.mail}>{mail}</th>
                  <th className={styles.actionCell}>
                    {mode === "edit" && (
                      <button type="button" onClick={() => setActive(note)}>
                        Редактировать
                      </button>
                    )}
                  </th>
                </tr>
              );
            })}

          {page_status.loading && (
            <tr>
              <th colSpan={6} style={{ textAlign: "center" }}>
                загрузка данных...
              </th>
            </tr>
          )}
          {!page_status.loading && page_status.query.length>0 && inView.length===0 && (
            <tr>
              <th colSpan={6} style={{ textAlign: "center" }}>
                нет совпадений
              </th>
            </tr>
          )}
          {
            !has_result && (
              <tr>
                <th colSpan={6} style={{ textAlign: "center",padding:'2rem 0' }}>
                 <div className={styles.emptyList}>
                  <span>нет ни одной сохраненной записи</span>
                 </div>
                </th>
              </tr>
            )
          }
        </tbody>
      </table>
    </main>
  );
}

export { TableView };
