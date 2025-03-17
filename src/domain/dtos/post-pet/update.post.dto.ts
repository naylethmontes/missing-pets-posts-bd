export class UpdatePostDto {
  constructor(public pet_name: string, public description: string) {}

  static execute(object: { [key: string]: any }): [string?, UpdatePostDto?] {
    const { pet_name, description } = object;

    if (!pet_name) return ['pet name is required'];

    if (!description) return ['description is required'];

    return [
      undefined,
      new UpdatePostDto(
        pet_name.trim().toLowerCase(),
        description.trim().toLowerCase()
      ),
    ];
  }
}
