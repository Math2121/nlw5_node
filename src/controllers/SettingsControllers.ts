import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SettingsRepository } from "../repositories/SettingsRepousitory";
import { SettingService } from "../services/SettingsService";
class SettingController {
  async create(request: Request, response: Response) {
    const { chat, username } = request.body;
    const settingsService = new SettingService();
    try {
      const settings = await settingsService.create({ chat, username });
      return response.json(settings);
    } catch (error) {
      return response.status(400).json({error: error.message})
    }
  }
}
export { SettingController };
