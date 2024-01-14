import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AboutUsPage from '../pages/AboutUsPage';
import CalendarPage from '../pages/CalendarPage';
import ContactUsPage from '../pages/ContactUsPage';
import EmployeeLeaveRequestPage from '../pages/EmployeeLeaveRequestPage';
import EmployeeReportsPage from '../pages/EmployeeReportsPage';
import EmployeeStatisticsPage from '../pages/EmployeeStatisticsPage';
import HomePage from '../pages/HomePage';
import LeaveManagementPage from '../pages/LeaveManagementPage';
import DashboardPage from '../pages/DashboardPage';
import ProfilePage from '../pages/ProfilePage';
import ReportPage from '../pages/ReportPage';
import SendNotificationPage from '../pages/SendNotificationPage';
import SettingsPage from '../pages/SettingsPage';
import StatisticsPage from '../pages/StatisticsPage';
import VideoConferencePage from '../pages/VideoConferencePage';
import WorkingStatusBoardPage from '../pages/WorkingStatusBoardPage';
import SendEmailPage from '../pages/SendEmailPage';

const PrivateRoutes = (props) => {

  const [routes,setRoutes] = React.useState(null);

  React.useEffect(()=>{
    if (props.userType === 0) {
      setRoutes(<React.Fragment>
        <Route path='/leave-management' element={<LeaveManagementPage />} />
        <Route path='/report' element={<ReportPage />} />
        <Route path='/statistics' element={<StatisticsPage />} />
        <Route path='/working-status-board' element={<WorkingStatusBoardPage />} />
        <Route path='/send-notification' element={<SendNotificationPage />} />
        <Route path='/send-email' element={<SendEmailPage />} />
        <Route path='/settings' element={<SettingsPage />} />
        <Route path='/dashboard' element={<DashboardPage />} />
      </React.Fragment>);
    } else if (props.userType === 1) {
      setRoutes(<React.Fragment>
        <Route path='/leave-management' element={<LeaveManagementPage />} />
        <Route path='/report' element={<ReportPage />} />
        <Route path='/statistics' element={<StatisticsPage />} />
        <Route path='/working-status-board' element={<WorkingStatusBoardPage />} />
        <Route path='/send-notification' element={<SendNotificationPage />} />
        <Route path='/send-email' element={<SendEmailPage />} />
      </React.Fragment>);
    } else {
      setRoutes(<React.Fragment>
        <Route path='/leave-management' element={<EmployeeLeaveRequestPage />} />
        <Route path='/report' element={<EmployeeReportsPage />} />
        <Route path='/statistics' element={<EmployeeStatisticsPage />} />
      </React.Fragment>);
    }
  },[props.userType])
  
  return (
    <React.Fragment>
      {routes&&<Routes>
        <Route path='/home' element={<HomePage />} />
        <Route path='/calendar' element={<CalendarPage />} />
        <Route path='/video-conference' element={<VideoConferencePage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/contact-us' element={<ContactUsPage />} />
        <Route path='/about-us' element={<AboutUsPage />} />
        {
          routes
        }
      </Routes>}
    </React.Fragment>
  )
}

export default PrivateRoutes;