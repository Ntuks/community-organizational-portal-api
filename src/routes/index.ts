import AuthRouter from './auth';
import UserRouter from './user';
import AdminRouter from './admin';
import EventRouter from './event';
import ProjectRouter from './project';
import OrgRouter from './organization';
import CampaignRouter from './campaign';
import OrgManagerRouter from './orgManager';

const APIRoutes = [UserRouter, EventRouter, ProjectRouter, OrgManagerRouter, OrgRouter, CampaignRouter, AdminRouter];

export default { AuthRouter, APIRoutes };