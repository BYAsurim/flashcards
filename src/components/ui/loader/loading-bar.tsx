import s from './loading-bar.module.scss'

export const LoadingBar = () => {
  return (
    <div className={s.loadingBarContainer}>
      <div className={s.loadingBar}></div>
    </div>
  )
}
