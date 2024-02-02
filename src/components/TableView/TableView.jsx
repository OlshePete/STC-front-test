import { phoneFormat } from '../../utils/tableUtils';
import styles from './styles.module.css'

function TableView({list=[]}) {
  return (
     <main className={styles.tableContainer}>
      <table className={styles.table} >
        <thead>
          <tr>
            <th className={styles.avatarColumn}>
              O
            </th>
            <th>Имя</th>
            <th className={styles.phone}>Телефон</th>
            <th className={styles.address}>Адрес</th>
            <th className={styles.mail}>Почта</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            Array.isArray(list) && list.map(({first_name,last_name,phoneNumber,address,mail, image}, index)=>{
              const fullName = `${first_name ?? ""}${last_name?" "+last_name:""}`.trim();
              const formattedNumber = phoneNumber ? phoneFormat(phoneNumber):"";
              console.log(formattedNumber);
              return <tr key={index}>
                <th className={styles.avatarColumn}>{
                  image?<img alt="avatar" src={image}/>:<h4>{`${last_name ?? ""}${first_name}`[0]}</h4>
                }</th>
                <th>{fullName}</th>
                <th className={styles.phone}>+7 {formattedNumber}</th>
                <th className={styles.address}>{address}</th>
                <th className={styles.mail}>{mail}</th>
                <th className={styles.actionCell}>
                  <button >
                    Редактировать
                  </button>
                </th>
              </tr>
            })
          }
          {/* Здесь вы можете добавить строки с данными */}
        </tbody>
      </table>
    </main>
  )
}

export {TableView}