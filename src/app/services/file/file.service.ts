import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { UrlBuilderService } from '../url/url-builder.service'

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient,
              private urlBuilder: UrlBuilderService) {
  }

  uploadFile(file: File, fileName: string | null = null) {
    let params = new HttpParams()
    if (fileName) params = params.set('fileName', fileName)
    return this.http.post<number>(
      'files/upload',
      file,
      {
        params: params
      }
    )
  }

  getFileUrl(fileId: number) {
    return this.urlBuilder.build(`files/${fileId}`)
  }
}
