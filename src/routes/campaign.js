import handlers from '../handlers';

export default function(app) {
  // retrieve all camapaigns
  app.get('/api/v1/campaigns', handlers.campaign.getAllCampaigns);

  // retrieve a campaign
  app.get('/api/v1/campaigns/:campId', handlers.campaign.getCampaign);

  // create a campaign
  app.post('/api/v1/campaigns', handlers.campaign.createCampaign);

  // update a campaign
  app.put('/api/v1/campaigns/:campId', handlers.campaign.updateCampaign);

  // delete a campaign
  app.delete('/api/v1/campaigns/:campId', handlers.campaign.deleteCampaign);
}
