import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'ds-file-upload',
  templateUrl: './ds-file-upload.component.html',
  styleUrl: './ds-file-upload.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsFileUploadComponent {
  readonly label = input('Upload file');
  readonly hint = input('Drag and drop or click to browse');
  readonly accept = input('');
  readonly multiple = input(false);
  readonly disabled = input(false);

  readonly filesSelected = output<File[]>();

  protected readonly isDragging = signal(false);
  protected readonly selectedFiles = signal<File[]>([]);

  onFilesSelected(fileList: FileList | null): void {
    if (!fileList?.length || this.disabled()) {
      return;
    }

    const files = Array.from(fileList);
    this.selectedFiles.set(files);
    this.filesSelected.emit(files);
  }

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.onFilesSelected(input.files);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    if (!this.disabled()) {
      this.isDragging.set(true);
    }
  }

  onDragLeave(): void {
    this.isDragging.set(false);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging.set(false);
    this.onFilesSelected(event.dataTransfer?.files ?? null);
  }

  fileNames(): string {
    const files = this.selectedFiles();
    if (!files.length) {
      return '';
    }

    return files.map((file) => file.name).join(', ');
  }
}
