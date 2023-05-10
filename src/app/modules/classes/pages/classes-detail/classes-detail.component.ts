import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { IClasse } from 'src/app/core/models/classes';
import { ClassesService } from '../../services/classes.service';

@Component({
  selector: 'app-classes-detail',
  templateUrl: './classes-detail.component.html',
  styleUrls: ['./classes-detail.component.scss']
})
export class ClassesDetailComponent implements OnDestroy {

  public classe: IClasse | undefined;
  private destroyed$ = new Subject()

  constructor(
    private activatedRoute: ActivatedRoute,
    private classesService: ClassesService
  ) {
    this.classesService.getClassesById(parseInt(this.activatedRoute.snapshot.params['id']))
      .pipe(takeUntil(this.destroyed$))
      .subscribe((classe) => this.classe = classe);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }

}
