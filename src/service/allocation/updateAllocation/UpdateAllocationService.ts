import { Validation } from '../../../domain/utils/validator'
import { IUpdateAllocationService } from '../../../domain/service/allocation/updateAllocation/IUpdateAllocationService'
import { IAllocationRepository } from '../../../domain/data/repository/allocation/IAllocationRepository'
import { IAllocation } from '../../../domain/data/entity/IAllocation'
import { IUserRepository } from '../../../domain/data/repository/user/IUserRepository'
import { IConstructionRepository } from '../../../domain/data/repository/construction/IConstructionRepository'
import { EStatus } from '../../../domain/data/entity/ISchedule'
import { EmailService } from '../../../utils/sendEmail'

export class UpdateAllocationService implements IUpdateAllocationService {
  constructor (
    private readonly _allocationRepository: IAllocationRepository,
    private readonly _validator: Validation,
    private readonly _userRepository: IUserRepository,
    private readonly _constructionRepository: IConstructionRepository) {}

  async handler (allocation: IAllocation): Promise<IAllocation|Error> {
    if (!allocation.id) {
      return new Error('A allocation who already no has an ID cannot be saved.')
    }

    const hasIncorrectValue = await this._validator.validate(allocation)

    if (hasIncorrectValue) {
      return hasIncorrectValue
    }

    const result = await this._allocationRepository.updateAllocation(allocation)

    if (result) {
      const user = await this._userRepository.getUser('id', result.userId)
      const construction = await this._constructionRepository.getConstruction('id', result.constructionId)

      const message = result.status === EStatus.inactive
        ? `${new Date(result.createdAt).toLocaleString('pt-Br').split(',')[0]}. E essa atualização é devido a conclusão dela.`
        : new Date(result.createdAt).toLocaleString('pt-Br').split(',')[0]

      await EmailService.sendEmail(
        user.email,
        user.name,
        construction.name,
        'uma atualização na sua alocação',
        message,
        'Você teve uma atualização na sua alocação!',
        'Venha ver...'
      )
    }

    return result
  }
}
