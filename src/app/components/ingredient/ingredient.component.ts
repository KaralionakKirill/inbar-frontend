import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { IngredientInfo } from '../../domain/ingredient'
import { FileService } from '../../services/file/file.service'

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css']
})
export class IngredientComponent implements OnInit{
  ingredientInfo!: IngredientInfo

  constructor(private route: ActivatedRoute,
              private fileService: FileService) {
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
        this.ingredientInfo = data['ingredientInfo']
      }
    )
  }

  getImageUrl() {
    return this.fileService.getFileUrl(this.ingredientInfo.imageId)
  }
}
