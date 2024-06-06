import { PrismaClient } from '@prisma/client'
import { IReport } from '../../../domain/data/entity/IReport'
import { IReportRepository } from '../../../domain/data/repository/report/IReportRepository'

export class PrismaReportRepository implements IReportRepository {
  constructor (readonly _prismaClient: PrismaClient) {}

  private map (object: any): IReport {
    const report: IReport = {
      id: object.id,
      createdAt: new Date(object.createdAt),
      description: object.description,
      constructionId: object.constructionId,
      scheduleId: object.scheduleId,
      userId: object.userId,
      typeReport: object.typeReport,
      isValided: object.isValided
    }

    return report
  }

  async insertReport (reportData: Omit<IReport, 'id' | 'createdAt'>): Promise<IReport> {
    const report = await this._prismaClient.report.create({
      data: reportData
    })

    return report
  }

  async updateReport (reportToUpdate: IReport): Promise<IReport> {
    const { id, ...data } = reportToUpdate

    const report = await this._prismaClient.report.update({
      data,
      where: { id }
    })

    return report
  }

  async getReport (reportId: number): Promise<IReport | null> {
    const r = this._prismaClient.report.findUnique({
      where: { id: reportId }
    })

    return this.map(r)
  }

  async getReports (): Promise<IReport[] | null> {
    const r = await this._prismaClient.report.findMany({
      orderBy: [
        {
          id: 'asc'
        }
      ]
    })

    return r.map(report => this.map(report))
  }

  async getReportByUserId (userId: number): Promise<IReport[]> {
    const r = await this._prismaClient.report.findMany({
      where: { userId }
    })
    return r.map(report => this.map(report))
  }

  async getReportBySchedulesId (scheduleId: number): Promise<IReport[]> {
    const r = await this._prismaClient.report.findMany({
      where: { scheduleId }
    })
    return r.map(report => this.map(report))
  }

  async getReportByConstructionId (constructionId: number): Promise<IReport[]> {
    const r = await this._prismaClient.report.findMany({
      where: { constructionId },
      orderBy: [
        {
          id: 'asc'
        }
      ]
    })
    return r.map(report => this.map(report))
  }

  async deleteReport (reportId: number): Promise<IReport> {
    const report = await this.getReport(reportId)

    if (!report) {
      throw new Error('[ENTITY - REPORT]: Relatório não encontrado')
    }

    await this._prismaClient.report.delete({
      where: { id: reportId }
    })

    return report
  }
}
