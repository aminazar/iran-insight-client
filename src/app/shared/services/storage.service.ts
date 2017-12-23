import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
  stackStorage = [];

  constructor() { }

  saveData(componentName, data = {}){
    let index = this.stackStorage.findIndex(el => el.name.toLowerCase() === componentName.toLowerCase());

    if(index !== -1){
      this.stackStorage[index] = {
        name: componentName,
        data: data,
      };
    }
    else{
      this.stackStorage.push({
        name: componentName,
        data: data,
      });
    }
  }

  getData(componentName){
    let index = this.stackStorage.findIndex(el => el.name.toLowerCase() === componentName.toLocaleString());

    if(index !== -1){
      let destData = this.stackStorage[index].data;
      this.stackStorage.splice(index, 1);
      return destData;
    }

    return null;
  }
}
