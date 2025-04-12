"use client"

import {useAuth} from "@/app/context/AuthProviderContext";
import {useAccountForm} from "@/app/hooks/useAccountForm";
import {AccountFormView} from "@/app/customer/account/components/AccountFormView";

export default function AccountClientContent() {
    const {user} = useAuth();
    const {
        loading,
        isEditing,
        updating,
        register,
        errors,
        handleSubmit,
        handleGenderChange,
        toggleEdit,
        cancelEdit
    } = useAccountForm(user?.uid);
    return (
        <AccountFormView
            loading={loading}
            isEditing={isEditing}
            updating={updating}
            register={register}
            errors={errors}
            handleGenderChange={handleGenderChange}
            toggleEdit={toggleEdit}
            cancelEdit={cancelEdit}
            handleSubmit={handleSubmit}
        />
    )
}