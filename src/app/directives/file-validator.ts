import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appFileValidator]',
})
export class FileValidator {
  @Output() fileValid = new EventEmitter<File>();
  @Output() fileError = new EventEmitter<string>();

 private readonly MAX_SIZE = 200 * 1024; // 2MB
  private readonly ALLOWED_TYPES = ['image/jpeg', 'image/png'];

  @HostListener('change', ['$event'])
  onFileChange(event: Event) {
    const element = event.target as HTMLInputElement;
    const files = element.files;

    if (!files || files.length === 0) {
    return;
  }
    const file = files[0];
    if (!file) return;

    if (!this.ALLOWED_TYPES.includes(file.type)) {
      this.fileError.emit('Дозволені лише формати JPEG та PNG.');
      return;
    }

    if (file.size > this.MAX_SIZE) {
      this.fileError.emit('Максимальний розмір файлу — 200 Kb.');
      return;
    }

    this.fileValid.emit(file);
  }

}
