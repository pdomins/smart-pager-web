import CloseIcon from '@mui/icons-material/Close'
import ViewMenu from '../restaurants/restaurant/restaurant-control-panel/tabs/menu/pdf'

const MenuPage = ({
  toggleMenuPageVisibility,
  menuUrl,
}: {
  toggleMenuPageVisibility: () => void
  menuUrl: string
}) => {
  return (
    <div className="min-h-screen flex flex-col justify-center relative">
      <div
        className="absolute top-2 left-2 cursor-pointer"
        onClick={toggleMenuPageVisibility}
      >
        <CloseIcon style={{ fontSize: '30px' }} />
      </div>
      <div className="py-10">
        <ViewMenu menu={menuUrl} />
      </div>
    </div>
  )
}

export default MenuPage
