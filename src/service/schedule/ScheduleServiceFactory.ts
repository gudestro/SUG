import { makeGetScheduleService } from './getSchedule/GetScheduleServiceFactory'
import { makeGetSchedulesService } from './getSchedules/GetSchedulesServiceFactory'
import { makeDeleteScheduleService } from './deleteSchedule/DeleteScheduleServiceFactory'
import { IGetScheduleService } from '../../domain/service/schedule/getSchedule/IGetScheduleService'
import { ISaveScheduleService } from '../../domain/service/schedule/saveSchedule/ISaveScheduleService'
import { IGetSchedulesService } from '../../domain/service/schedule/getSchedules/IGetSchedulesService'
import { IDeleteScheduleService } from '../../domain/service/schedule/deleteSchedule/IDeleteScheduleService'
import { IUpdateScheduleService } from '../../domain/service/schedule/updateSchedule/IUpdateScheduleService'
import { makeSaveScheduleService } from './saveSchedule/SaveScheduleServiceFactory'
import { makeUpdateScheduleService } from './updateSchedule/UpdateScheduleServiceFactory'
import { makeScheduleValidation } from './ScheduleValidation'

export interface IScheduleService {
  getScheduleService: IGetScheduleService
  getSchedulesService: IGetSchedulesService
  saveScheduleService: ISaveScheduleService
  updateScheduleService: IUpdateScheduleService
  deleteScheduleService: IDeleteScheduleService
}

export const makeScheduleService = (): IScheduleService => {
  const validator = makeScheduleValidation()
  const getScheduleService = makeGetScheduleService().getScheduleService
  const saveScheduleService = makeSaveScheduleService(validator).saveScheduleService
  const updateScheduleService = makeUpdateScheduleService(validator).updateScheduleService
  const deleteScheduleService = makeDeleteScheduleService().deleteScheduleService
  const getSchedulesService = makeGetSchedulesService().getSchedulesService

  return {
    getScheduleService,
    saveScheduleService,
    updateScheduleService,
    deleteScheduleService,
    getSchedulesService
  }
}
