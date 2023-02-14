<script setup>
definePageMeta({
    layout: 'head'
});

var contacts = ref([]);

onMounted(async () => {
    const ccc = await fetch('http://localhost:3001/api/contacts');
    contacts.value = await ccc.json();
    console.log(contacts.value);
});
</script>
<template>
    <div>
        <div class="page-content">
            <section class="row">
                <div class="col-sm-12">
                    <div class="card">
                        <div class="card-content">
                            <div class="card-body">
                                <h4 class="card-title">Contactos</h4>
                                <div class="card-text">
                                    <div class="table-responsive">
                                        <table class="table table-lg">
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    <th>Nombre</th>
                                                    <th>Número</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="contact in contacts">
                                                    <td class="text-bold-500">
                                                        <div class="avatar avatar-xl me-3">
                                                            <img :src="contact.profilePicUrl" alt="" srcset="" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {{ contact.name }}
                                                    </td>
                                                    <td class="text-bold-500">{{ contact.formattedNumber }}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer d-flex justify-content-between">
                            <span>Card Footer</span>
                            <button class="btn btn-light-primary">Read More</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>
