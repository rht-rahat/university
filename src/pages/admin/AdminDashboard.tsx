import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useGetAllAdminsQuery } from "../../redux/features/admin/userManagement.api";
import {  Skeleton } from "antd";

interface Admin {
  id: string;
  fullName: string;
  email: string;
  profileImg: string;
  designation: string
  // Add other fields as needed
}
const AdminDashboard = () => {

  const user = useSelector((state: RootState) => state.auth.user);
  const { data: adminData, isLoading } = useGetAllAdminsQuery(undefined);
  console.log(adminData);
  const admins: Admin[] = adminData?.data || [];
  // Filter adminData based on user.userId
  const foundAdmin = admins?.find(admin => admin.id === user?.userId);

  const capitalize = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  }

  return (
    <div className="max-w-4xl">
      {isLoading ? ( 
          <Skeleton active paragraph={{rows: 4}} />
      ) : foundAdmin ? (
      <div className="max-w-4xl flex items-center h-auto flex-wrap  my-32 lg:my-0">   
      <div id="profile"
        className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0">
        <div className="p-4 md:p-12 text-center lg:text-left">
          <div className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"
            style={{ backgroundImage: `url(${foundAdmin?.profileImg})` }}></div>
          <h1 className="text-3xl font-bold pt-8 lg:pt-0">{foundAdmin?.fullName}</h1>
          <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>

          <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
            <svg className="h-4 fill-current text-green-700 pr-4" xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20">
              <path
                d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
            </svg> {foundAdmin?.designation? capitalize(foundAdmin?.designation): ""} 
          </p>
          


          <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
          <svg className="h-4 fill-current text-green-700 pr-4" id="Capa_1" enable-background="new 0 0 509.999 509.999" viewBox="0 0 509.999 509.999" xmlns="http://www.w3.org/2000/svg"><g><path d="m90 90v390l82.5 15 82.5-15 15-195-15-90-105-105z" fill="#e8f1fd"/><path d="m420 90h-60l-105 105v285l82.5 15 82.5-15c0-11.005 0-379.009 0-390z" fill="#cfdbfd"/><path d="m90 480v29.999h165l15-15-15-15c-61.96.001-107.155.001-165 .001z" fill="#cfdbfd"/><path d="m420 480c-58.093 0-102.682 0-165 0v29.999h165c0-10.492 0-19.507 0-29.999z" fill="#b3c7ef"/><path d="m150 90v105h105v-105c-28.279 0-88.527 0-105 0z" fill="#cfdbfd"/><path d="m360 90c-28.278 0-88.527 0-105 0v105h105c0-28.278 0-88.527 0-105z" fill="#b3c7ef"/><path d="m225 0v120l15 15 15-15 15-60-15-60c-10.493 0-19.508 0-30 0z" fill="#424864"/><path d="m285 0c-10.492 0-19.508 0-30 0v120l15 15 15-15c0-14.518 0-105.386 0-120z" fill="#32334c"/><path d="m225 120v30h30l15-15-15-15z" fill="#32334c"/><path d="m285 120h-30v30h30c0-10.492 0-19.508 0-30z" fill="#222337"/><path d="m217.618 310.021c-22.82 13.179-37.618 37.632-37.618 64.978v15h75l15-30-15-30z" fill="#7cd486"/><path d="m330 374.999c0-27.335-14.789-51.793-37.618-64.979l-37.382 19.979v60h75c0-5.246 0-9.754 0-15z" fill="#60a38e"/><path d="m150 419.998v30.001h105l15-15.001-15-15c-28.279 0-88.528 0-105 0z" fill="#97e4fd"/><path d="m360 419.998c-28.278 0-88.527 0-105 0v30.001h105c0-10.493 0-19.508 0-30.001z" fill="#83c6fc"/><path d="m210 284.999c0 24.812 20.186 45 45 45l15-45-15-45c-24.813.001-45 20.186-45 45z" fill="#f4dbcb"/><path d="m300 284.999c0-24.812-20.186-45-45-45v90c24.811 0 45-20.187 45-45z" fill="#edbba8"/></g></svg> {foundAdmin?.id}
          </p>
          <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
            <svg className="h-4 fill-current text-green-700 pr-4" xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20">
              <path
                d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm7.75-8a8.01 8.01 0 0 0 0-4h-3.82a28.81 28.81 0 0 1 0 4h3.82zm-.82 2h-3.22a14.44 14.44 0 0 1-.95 3.51A8.03 8.03 0 0 0 16.93 14zm-8.85-2h3.84a24.61 24.61 0 0 0 0-4H8.08a24.61 24.61 0 0 0 0 4zm.25 2c.41 2.4 1.13 4 1.67 4s1.26-1.6 1.67-4H8.33zm-6.08-2h3.82a28.81 28.81 0 0 1 0-4H2.25a8.01 8.01 0 0 0 0 4zm.82 2a8.03 8.03 0 0 0 4.17 3.51c-.42-.96-.74-2.16-.95-3.51H3.07zm13.86-8a8.03 8.03 0 0 0-4.17-3.51c.42.96.74 2.16.95 3.51h3.22zm-8.6 0h3.34c-.41-2.4-1.13-4-1.67-4S8.74 3.6 8.33 6zM3.07 6h3.22c.2-1.35.53-2.55.95-3.51A8.03 8.03 0 0 0 3.07 6z" />
            </svg> {foundAdmin?.email}
          </p>
          <p className="pt-8 text-sm"></p>

          <div className="pt-12 pb-8">
            <button className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 ">
              Admin
            </button>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-2/5">
        <img src={foundAdmin?.profileImg} className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block" />

      </div>
      <div className="absolute top-0 right-0 h-12 w-18 p-4">
        <button className="js-change-theme focus:outline-none">🌙</button>
      </div>
    </div>
    ): (
      <p>Admin Not Found</p>
    )}
  </div>
  );
};

export default AdminDashboard;
