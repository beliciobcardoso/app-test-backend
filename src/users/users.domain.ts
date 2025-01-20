import {IsDate, IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength} from "class-validator"

export class UserDomain {
    @IsOptional()
    @IsString({message: 'id deve ser uma string'})
    readonly id?: string

    @IsString({message: 'nome deve ser uma string'})
    @IsNotEmpty({message: 'nome é obrigatório'})
    @MinLength(3, {message: 'nome deve ter no mínimo 3 caracteres'})
    @MaxLength(50, {message: 'nome deve ter no máximo 50 caracteres'})
    readonly name: string;

    @IsString({message: 'email deve ser uma string'})
    @IsNotEmpty({message: 'email é obrigatório'})
    @IsEmail({}, {message: 'email inválido'})
    readonly email: string;
    
    @IsOptional()
    @IsString({message: 'senha deve ser uma string'})
    @IsNotEmpty({message: 'senha é obrigatória'})
    @MinLength(8, {message: 'senha deve ter no mínimo 8 caracteres'})
    @MaxLength(20, {message: 'senha deve ter no máximo 20 caracteres'})
    readonly password: string;
    
    @IsOptional()
    @IsDate({message: 'Invalido o formato da data de criação'})
    readonly createdAt: Date;
    
    @IsOptional()
    @IsDate({message: 'Invalido o formato da data de atualização'})
    readonly updatedAt: Date;
}