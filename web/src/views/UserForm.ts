import { User, UserProps } from '../models/User';
import { View } from './View';

export class UserForm extends View<User, UserProps> {
  eventsMap(): { [key: string]: () => void} {
    return {
      'click:.set-age': this.onSetAge,
      'click:.set-name': this.onSetName,
      'click:.set-model': this.onSave,
    }
  }

  onSave = (): void => {
    this.model.save();
  }

  onSetAge = (): void => {
    this.model.setRandomAge();
  }

  onSetName = ():void => {
    const input = this.parent.querySelector('input');
    this.model.set({ name: input.value });
  }

  template(): string {
    return `
      <div>
        <input placeholder="${this.model.get('name')}"/>
        <button class="set-name">Click me</button>
        <button class="set-age">Set random age</button>
        <button class="set-model">Save</button>
      </div>
    `;
  }
}